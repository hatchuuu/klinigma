import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
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
import { getDataPolyById } from "@/data/poly";

const DashboardPage = () => {
  const [user, setUser] = useState("")
  const [allBookings, setAllBookings] = useState("")
  const [latestBooking, setLatestBooking] = useState("")
  const [dataPoly, setDataPoly] = useState("")
  const token = sessionStorage.getItem("token")
  const { id, role } = jwtDecode(token)

  const fetchIdUser = async () => {
    try {
      const response = await getUserById(id)
      setUser(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchDataBookings = async () => {
    try {
      const response = await getAllDataBooking()
      const filteredBookingById = response?.data?.filter((value) => {
        return value.userId.includes(id)
      })
      setAllBookings(filteredBookingById)

      const latestBooking = getLatestToken(filteredBookingById)
      setLatestBooking(latestBooking)
      fetchDataPolys(latestBooking.polyId)

    } catch (error) {
      console.log(error);
    }
  }

  const fetchDataPolys = async (idPoly) => {
    try {
      const response = await getDataPolyById(idPoly);
      setDataPoly(response.data);
    } catch (error) {
      console.log("Gagal mendapatkan data poliklinik:", error);
    }
  };

  useEffect(() => {
    if (role == "user") {
      fetchDataBookings()
    }
    fetchIdUser()
  }, [])

  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5855003249085!2d106.73948209999999!3d-6.1861864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f72a01b8f00d%3A0x7f87d867fb930560!2sPT.%20Kreasi%20Layanan%20Medis!5e0!3m2!1sen!2sid!4v1734104130782!5m2!1sen!2sid"; // Ganti dengan URL Google Maps Anda

  return (
    <div>
      {
        (user) ?
          <div className="mx-auto">
            <section className="flex justify-between items-center p-6 md:px-10 md:invisible">
              <div className="flex gap-5">
                {/* Avatar with dropdown trigger */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="rounded-full w-11 h-11 border-2 border-black cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-lg p-2 w-48">
                    <DropdownMenuItem className="text-sm text-purple-800" onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div>
                  <p className="font-semibold uppercase">{user.name}</p>
                  <p className="text-xs capitalize">{user.gender}, {calculateAge(user.birthDate)} tahun</p>
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
                  <img src="/klinigma.png" alt="" className="sm:w-[150px] aspect-auto w-[100px]" />
                  <h1 className="sm:text-2xl text-lg font-light text-end text-white">
                    Layanan Kesehatan
                    <br /> Dalam Satu <br />
                    Genggaman
                  </h1>
                </div>
              </div>
            </section>
            {
              (latestBooking && dataPoly) &&
              <section>
                <div className="grid grid-cols-4 gap-4 px-5">
                  <p className="h-20 rounded-lg bg-primary text-white hover:shadow-xl shadow w-full"> Jam Mulai {formatDate(latestBooking.visitedAt).fullDate}, {formatDate(latestBooking.visitedAt).time}</p>
                  <div className="py-10 rounded-lg bg-primary  hover:shadow-xl shadow w-3/4 flex justify-center items-center">
                    <p className="text-2xl text-white semibold">Antrean Kamu{latestBooking.queue}</p>
                  </div>
                  <div className="py-10 rounded-lg bg-primary  hover:shadow-xl shadow w-3/4 flex justify-center items-center">
                    <p className="text-2xl text-white semibold">Antrean Sekarang{dataPoly.queue}</p>
                  </div>
                  <Link to="/all-queue" className="h-20 rounded-lg bg-primary text-white hover:shadow-xl shadow w-full">
                    Lihat semua antrean yang akan datang
                  </Link>
                </div>
              </section>
            }
            <section className="pb-16">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
                <Link
                  to="/booking"
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center"
                >
                  <CalendarDays size={40} className="text-purple-900 mb-3" />
                  <span className="text-lg font-medium text-center">
                    Booking Kunjungan
                  </span>
                </Link>
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

            <section className="px-4 -mt-10">
              <div className="flex items-center justify-center mb-8 gap-2">
                <LocateIcon />
                <h1 className="text-center text-2xl">Lokasi Klinik</h1>
              </div>
              <div className="w-full flex justify-center md:w-2/3 lg:w-1/2 mx-auto">
                {" "}
                {/* Atur lebar frame agar responsif */}
                <iframe
                  src={mapUrl}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-md w-full" // Tambahkan class Tailwind CSS
                ></iframe>
              </div>
            </section>
          </div>
          :
          <Loader />
      }
    </div>
  );
};

export default DashboardPage;
