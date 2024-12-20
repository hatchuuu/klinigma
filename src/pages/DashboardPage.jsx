import { Button } from "@/components/ui/button";
import { Bell, Check, User } from "lucide-react";
// import { fetchDataUsers } from "@/data/users";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarDays,
  MessageCircle,
  BookOpen,
  LocateIcon,
} from "lucide-react"; // Anda bisa mengganti ikon sesuai kebutuhan
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "@/data/users";
import { getAllDataBooking } from "@/data/bookings";
import { calculateAge, formatDate, getLatestToken } from "@/data/service";
import Loader from "@/components/Loader";
import { getAllDataPoly } from "@/data/poly";
import SideBarListQueue from "@/components/SideBarListQueue";
import TokenBoard from "@/components/TokenBoard";
import { getDoctorById } from "@/data/doctors";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [allBookings, setAllBookings] = useState(null);
  const [latestBooking, setLatestBooking] = useState(null);
  const [openHour, setOpenHour] = useState(null);
  const token = sessionStorage.getItem("token");
  const { id, role } = jwtDecode(token);
  const [isAdmin] = role.split("-")

  const navigate = useNavigate();

  const fetchIdUser = async () => {
    try {
      console.log("halo");
      const responseUser = await getUserById(id);
      setUser(responseUser.data);
      console.log("Fetched User:", responseUser.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataPolys = async () => {
    try {
      const polysData = await getAllDataPoly();
      return polysData;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataBookings = async () => {
    try {
      const responseBookings = await getAllDataBooking();
      // Filter bookings by userId and add polyName
      const filteredBookingById = responseBookings?.data?.filter(
        (value) => value.userId === id
      );
      const { data: polysData } = await fetchDataPolys();
      let filterBookings = [];
      for (let i = 0; i < filteredBookingById.length; i++) {
        let booking = { ...filteredBookingById[i] };
        for (let j = 0; j < polysData.length; j++) {
          let poly = polysData[j];
          if (booking.polyclinicId === poly.id) {
            booking["polyQueue"] = poly.currentQueue;
            booking["polyName"] = poly.polyclinicName;
            break;
          }
        }
        filterBookings.push(booking);
      }
      setAllBookings(filterBookings);
      // Find the first unfinished booking
      const latestBooking = filterBookings.find((value) => {
        return value.status == "Approved";
      });
      setLatestBooking(latestBooking);

      //Find Schedule Hour by Doctor and Day
      const { doctorId, scheduleDay } = latestBooking
      const { data: docData } = await getDoctorById(doctorId)
      const findSchedulesHour = docData.schedules.find((value) => value.day == scheduleDay)
      const openOn = findSchedulesHour.open
      setOpenHour(openOn)
      // const closeOn = findSchedulesHour.close

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (role === "user") {
        fetchDataBookings();
      }
      fetchIdUser();
    };
    fetchData();
  }, [token]); // Re-run effect if token changes

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5855003249085!2d106.73948209999999!3d-6.1861864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f72a01b8f00d%3A0x7f87d867fb930560!2sPT.%20Kreasi%20Layanan%20Medis!5e0!3m2!1sen!2sid!4v1734104130782!5m2!1sen!2sid";

  console.log({ latestBooking });
  return (
    <div>
      {user ? (
        <div className="mx-auto">
          <section className="flex justify-between items-center p-6 md:px-10 md:invisible">
            <div className="flex gap-5">
              {/* Avatar with dropdown trigger */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="rounded-full w-11 h-11 border-2 border-black cursor-pointer flex justify-center items-center">
                    <User />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-lg p-2 w-48">
                  <DropdownMenuItem
                    className="text-sm text-purple-800"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div>
                <p className="font-semibold uppercase">{user.name}</p>
                <p className="text-xs capitalize">
                  {user.gender}, {calculateAge(user.birthDate)} tahun
                </p>
              </div>
            </div>
            <Button variant="ghost" size="rounded">
              <Bell />
            </Button>
          </section>

          <section className="mb-5">
            <div className="w-full px-4">
              {/* <input type="text" placeholder="Search Anything" className="w-full p-2 rounded-lg border-2 shadow text-xs" /> */}
              <div className="flex items-center justify-between bg-gradient-to-r from-white to-primary p-6 px-10">
                <img
                  src="/klinigma.png"
                  alt=""
                  className="sm:w-[150px] aspect-auto w-[100px]"
                />
                <h1 className="sm:text-2xl text-lg font-light text-end text-white">
                  Layanan Kesehatan
                  <br /> Dalam Satu <br />
                  Genggaman
                </h1>
              </div>
            </div>
          </section>

          {/* Section for Latest Booking */}
          {
            isAdmin !== "admin" &&
            <section className="p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
                {latestBooking ? (
                  <>
                    <div className=" rounded-lg shadow-lg text-center">
                      <div className=" font-medium py-3 rounded-t-lg">
                        <p className="text-lg text-white semibold">
                          Jam Beroperasi
                        </p>
                      </div>
                      <div className="p-4">
                        <p className="text-2xl text-black semibold">
                          {formatDate(latestBooking.bookingDate).fullDate},
                          {openHour}
                        </p>
                        <p>{latestBooking.polyName}</p>
                      </div>
                    </div>

                    <div className="">
                      <TokenBoard latestBooking={latestBooking} />
                    </div>

                    <div>
                      <SideBarListQueue data={allBookings} />
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-lg shadow-lg text-center col-span-2 sm:mb-4">
                    <div className="bg-purple-500 text-white font-medium py-3 rounded-lg">
                      <p className="text-lg text-white semibold">
                        Anda Belum Memiliki Nomor Antrean
                      </p>
                      <Link to="/booking"><Button> Ambil Nomor Antrean</Button></Link>
                    </div>
                  </div>
                )
                }
              </div>
            </section>
          }
          {/* Section for Links */}
          <section className="sm:order-1 order-2 w-full sm:w-1/2 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
              {
                isAdmin !== "admin" ?
                  (<>
                    {
                      isAdmin == "superadmin" && (
                        <Link
                          to="/admin/approved"
                          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center"
                        >
                          <Check size={40} className="text-purple-900 mb-3" />
                          <span className="text-lg font-medium text-center">
                            Setujui Kunjungan
                          </span>
                        </Link>
                      )
                    }
                    <Link
                      to="/booking"
                      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center"
                    >
                      <CalendarDays size={40} className="text-purple-900 mb-3" />
                      <span className="text-lg font-medium text-center">
                        Booking Kunjungan
                      </span>
                    </Link>
                  </>)
                  :
                  <Link
                    to="/admin/handler"
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center"
                  >
                    <CalendarDays size={40} className="text-purple-900 mb-3" />
                    <span className="text-lg font-medium text-center">
                      Atur Antrean
                    </span>
                  </Link>
              }
              <Link
                to="/info"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center"
              >
                <BookOpen size={40} className="text-purple-900 mb-3" />
                <span className="text-lg font-medium text-center">
                  Info & Artikel
                </span>
              </Link>
              <Link
                to="/tanya"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center"
              >
                <MessageCircle size={40} className="text-purple-900 mb-3" />
                <span className="text-lg font-medium text-center">
                  Tanya Klinigma
                </span>
              </Link>
            </div>
          </section>

          <footer className="bg-gray-100 py-8 px-4">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="flex items-center gap-2 mb-2">
                <LocateIcon />
                <h1 className="text-center text-xl font-semibold text-gray-800">
                  Lokasi Klinik
                </h1>
              </div>
              <p className="text-center text-sm text-gray-600">
                Temukan lokasi klinik kami di peta berikut.
              </p>
            </div>
            <div className="w-full flex justify-center md:w-2/3 lg:w-1/2 mx-auto">
              {/* Atur lebar frame agar responsif */}
              <iframe
                src={mapUrl}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-md w-full h-64"
              ></iframe>
            </div>
            <div className="text-center text-sm text-gray-500 mt-6">
              &copy; {new Date().getFullYear()} Klinigma. Semua hak dilindungi.
            </div>
          </footer>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DashboardPage;
