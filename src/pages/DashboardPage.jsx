import { Button } from "@/components/ui/button";
import { Calendar, Check, House, User } from "lucide-react";
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
  Stethoscope,
  ClipboardList,
  HeartPulse,
  Baby,
  Monitor,
  TrendingUp,
  AlertCircle,
  Smile,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "@/data/users";
import { getAllDataBooking } from "@/data/bookings";
import { calculateAge, formatDate } from "@/data/service";
import Loader from "@/components/Loader";
import { getAllDataPoly } from "@/data/poly";
import SideBarListQueue from "@/components/SideBarListQueue";
import TokenBoard from "@/components/TokenBoard";
import { getDoctorById, getDoctorForTeam } from "@/data/doctors";
import dayjs from "dayjs";
import { SiderBar } from "@/components/SiderBar";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [allBookings, setAllBookings] = useState(null);
  const [latestBooking, setLatestBooking] = useState(null);
  const [openHour, setOpenHour] = useState(null);
  const token = sessionStorage.getItem("token");
  const { id, role } = jwtDecode(token);
  const [isAdmin] = role.split("-");
  const [doctor, setDoctor] = useState([]);
  const [message, setMessage] = useState("")

  const navigate = useNavigate();

  const fetchIdUser = async () => {
    try {
      const responseUser = await getUserById(id);
      setUser(responseUser.data);
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

  const fetchDoctorForTeam = async () => {
    try {
      const doctorTeam = await getDoctorForTeam();
      setDoctor(doctorTeam.data.slice(0, 3));
      console.log("doctorTeam", doctorTeam);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataBookings = async () => {
    try {
      const responseBookings = await getAllDataBooking();
      console.log({ responseBookings })
      // Filter bookings by userId and add polyName
      const filteredBookingById = responseBookings?.data?.filter(
        (value) => value.userId === id && (value.status == "Approved" || value.status == "Waiting")
      );
      console.log({ filteredBookingById })
      const { data: polysData } = await fetchDataPolys();
      let filterBookings = [];
      for (let i = 0; i < filteredBookingById.length; i++) {
        let booking = { ...filteredBookingById[i] };
        for (let j = 0; j < polysData.length; j++) {
          let poly = polysData[j];
          if (booking.polyclinicId === poly.id) {
            // booking["polyQueue"] = poly.currentQueue;
            booking["polyName"] = poly.polyclinicName;
            break;
          }
        }
        filterBookings.push(booking);
      }
      console.log({ filterBookings })
      //Periksa ada filter ga di ID itu?
      if (filterBookings.length > 0) {
        setAllBookings(filterBookings);
        // Find the first unfinished booking
        const approvedBookings = filterBookings.find((value) => {
          return value.status == "Approved";
        });
        setLatestBooking(approvedBookings);
        if (approvedBookings) {
          //Find Schedule Hour by Doctor and Day
          const { doctorId, scheduleDay } = approvedBookings;
          const { data: docData } = await getDoctorById(doctorId);
          const findSchedulesHour = docData.schedules.find(
            (value) => value.day == scheduleDay
          );
          const openOn = findSchedulesHour.open;
          setOpenHour(openOn);
        } else {
          setMessage("ANTREAN ANDA BELUM AKTIF, LAKUKAN CHECKIN TERLEBIH DAHULU")
        }
      } else {
        setMessage("ANDA BELUM MEMILIKI NOMOR ANTREAN");
      }
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
    fetchDoctorForTeam();
  }, [token]); // Re-run effect if token changes

  // const handleLogout = () => {
  //   sessionStorage.removeItem("token");
  //   navigate("/login");
  // };

  const mapUrl = (import.meta.env.VITE_MAP_URL).toString()


  // dummy info dan atikel
  const articles = [
    {
      id: 1,
      image: "/artikel-1.jpg",
      date: `${dayjs().format("dddd, DD-MM-YYYY")}`,
      title: "Cara Menghilangkan Bekas Luka dengan Bahan-Bahan Alami",
      description:
        "Luka yang disebabkan aktivitas harian semacam ini bisa memicu bekas luka yang membutuhkan waktu lama untuk hilang. Untungnya, ada cara menghilangkan bekas luka dengan bahan alami yang bisa kamu terapkan.",
      link: "https://www.halodoc.com/artikel/cara-menghilangkan-bekas-luka-dengan-bahan-bahan-alami",
    },
    {
      id: 2,
      image: "/artikel-2.jpg",
      date: `${dayjs().format("dddd, DD-MM-YYYY")}`,
      title: "Kaya Nutrisi, Ini 11 Manfaat Buah Melon Jika Rutin Dikonsumsi",
      description:
        "Melon adalah buah yang segar dan lezat yang banyak ditemukan di Indonesia dan negara-negara lain di dunia. Buah ini memiliki kulit berwarna hijau atau kuning dengan daging berwarna oranye, putih, atau hijau tergantung varietasnya. ",
      link: "https://www.halodoc.com/artikel/kaya-nutrisi-ini-11-manfaat-buah-melon-jika-rutin-dikonsumsi",
    },
    {
      id: 3,
      image: "/artikel-3.jpg",
      date: `${dayjs().format("dddd, DD-MM-YYYY")}`,
      title:
        "Makanan kaya zat bisa bisa kamu peroleh dari sumber heme (hewani) atau non heme (nabati).",
      description:
        "Zat besi adalah mineral yang punya peran vital untuk berbagai fungsi tubuh. Peran utamanya adalah memproduksi hemoglobin dalam sel darah merah yang bertanggung jawab mengangkut oksigen ke seluruh tubuh. ",
      link: "https://www.halodoc.com/artikel/ini-makanan-kaya-zat-besi-yang-mudah-didapatkan",
    },
  ];

  //dummy service
  const services = [
    {
      icon: <Baby className="text-blue-500 w-8 h-8" />,
      title: "Pediatrics",
      description: "Layanan perawatan kesehatan anak.",
    },
    {
      icon: <Stethoscope className="text-green-500 w-8 h-8" />,
      title: "General Medicine",
      description: "Layanan medis yang komprehensif.",
    },
    {
      icon: <Monitor className="text-purple-500 w-8 h-8" />,
      title: "Radiology",
      description: "Pencitraan diagnostik tingkat lanjut.",
    },
    {
      icon: <AlertCircle className="text-pink-500 w-8 h-8" />,
      title: "Emergency",
      description: "24/7 emergency care.",
    },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      {user ? (
        <div className="mx-auto mt-24">
          {/* Navbar */}
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
          {isAdmin !== "admin" && (
            // <section className="p-2">
            //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
            //     {latestBooking ? (
            //       <>
            //         <div className=" rounded-lg shadow-lg text-center">
            //           <div className=" font-medium py-3 rounded-t-lg">
            //             <p className="text-lg text-white semibold">
            //               Jam Beroperasi
            //             </p>
            //           </div>
            //           <div className="p-4">
            //             <p className="text-2xl text-black semibold">
            //               {formatDate(latestBooking.bookingDate).fullDate},
            //               {openHour}
            //             </p>
            //             <p>{latestBooking.polyName}</p>
            //           </div>
            //         </div>

            //         <div className="">
            //           <TokenBoard latestBooking={latestBooking} />
            //         </div>

            //         <div>
            //           <SideBarListQueue data={allBookings} />
            //         </div>
            //       </>
            //     ) : (
            //       <div className="bg-white rounded-lg shadow-lg text-center col-span-2 sm:mb-4">
            //         <div className="bg-purple-500 text-white font-medium py-5 rounded-lg">
            //           <p className="text-lg text-white semibold">
            //             {message}
            //           </p>
            //         </div>
            //         {/* lihat semua booking */}
            //         <div>
            //           <SideBarListQueue data={allBookings} />
            //         </div>
            //       </div>
            //     )}
            //   </div>
            // </section>
            <section className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latestBooking ? (
                  <>
                    <div className="rounded-lg shadow-lg border border-gray-200 text-center">
                      <div className="font-medium py-3 bg-purple-500 rounded-t-lg">
                        <p className="text-lg text-white semibold">
                          Jam Beroperasi
                        </p>
                      </div>
                      <div className="p-6">
                        <p className="text-2xl text-black semibold">
                          {formatDate(latestBooking.bookingDate).fullDate}, {openHour}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">{latestBooking.polyName}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                      <TokenBoard latestBooking={latestBooking} />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 w-full">
                      <SideBarListQueue data={allBookings} />
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-lg shadow-lg text-center col-span-2">
                    <div className="bg-purple-500 text-white font-medium py-5 rounded-t-lg">
                      <p className="sm:text-lg text-sm text-white semibold">{message}</p>
                    </div>
                    <div className="p-4 bg-gray-50 w-full">
                      <SideBarListQueue data={allBookings} />
                    </div>
                  </div>

                )}
              </div>
            </section>

          )}

          <section className="w-full pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8">
              {isAdmin !== "admin" ? (
                <>
                  {isAdmin === "superadmin" && (
                    <Link
                      to="/admin/approved"
                      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center border border-gray-300"
                    >
                      <Check size={40} className="text-purple-900 mb-3" />
                      <span className="text-lg font-semibold text-center text-gray-800">
                        Setujui Kunjungan
                      </span>
                    </Link>
                  )}
                  <Link
                    to="/booking"
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center border border-gray-300"
                  >
                    <CalendarDays size={40} className="text-purple-600 mb-3" />
                    <span className="text-lg font-semibold text-center text-gray-800">
                      Pendaftaran Online
                    </span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/admin/handler"
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center border border-gray-300"
                >
                  <CalendarDays size={40} className="text-purple-900 mb-3" />
                  <span className="text-lg font-medium text-center">
                    Atur Antrean
                  </span>
                </Link>
              )}
              <button onClick={() => handleScroll("fasilitas-pelayanan")}

                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center border border-gray-300"
              >
                <ClipboardList size={40} className="text-purple-600 mb-3" />
                <span className="text-lg font-semibold text-center text-gray-800">
                  Fasilitas Pelayanan
                </span>
              </button>
              <Link
                to="/doctorsList"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center border border-gray-300"
              >
                <Stethoscope size={40} className="text-purple-600 mb-3" />
                <span className="text-lg font-semibold text-center text-gray-800">
                  Dokter Spesialis
                </span>
              </Link>
            </div>
          </section>

          {/* about me */}
          <section className="flex flex-col lg:flex-row items-center lg:items-start px-6 lg:px-16 py-12 bg-gray-50">
            <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-xl font-semibold text-purple-500 uppercase">
                Tentang Kami
              </h2>
              <h1 className="text-4xl font-bold text-gray-800 mt-4">
                Komitmen dalam Pelayanan, Dedikasi dalam Kesehatan
              </h1>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                Klinigma kami didirikan dengan tujuan untuk memberikan
                layanan kesehatan berkualitas tinggi dengan teknologi terkini
                dan tenaga medis profesional. Dengan berbagai fasilitas modern,
                kami berkomitmen untuk memenuhi kebutuhan kesehatan Anda dan
                keluarga.
              </p>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Kami percaya bahwa kesehatan adalah prioritas utama, dan kami
                hadir untuk memastikan Anda mendapatkan perawatan terbaik, kapan
                pun Anda membutuhkannya.
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/picture-1.jpg"
                alt="Rumah Sakit"
                className="rounded-lg shadow-lg w-[200]"
              />
            </div>
          </section>

          {/* team */}
          <section className="w-full pb-16">
            <div className="p-8 bg-gray-100">
              <h2 className="text-3xl font-bold text-center mb-8">
                Dokter Kami
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {doctor.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white p-6 shadow-lg rounded-lg text-center"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 mx-auto rounded-full mb-4"
                    />
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    {/* <p className="text-gray-500">{member.role}</p> */}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center" id="fasilitas-pelayanan">
                <Link to="/doctorsList">
                  <Button className="text-purple-600 border border-purple-600 bg-white hover:bg-purple-300">
                    See More
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          {/* service */}
          <section >
            <div className="py-12 bg-gray-50">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  Fasilitas Pelayanan
                </h2>
                <p className="text-gray-500">
                  Kami menyediakan berbagai layanan perawatan kesehatan untuk
                  memenuhi kebutuhan Anda.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-16">
                {services.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg">
                    <CardHeader className="flex items-center justify-center">
                      {service.icon}
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-semibold text-center text-gray-700">
                        {service.title}
                      </h3>
                      <p className="text-sm text-center text-gray-500">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          {/* artikel */}
          <section className="w-full py-16">
            <div className="container mx-auto max-w-screen-lg px-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                Artikel Terbaru
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=No+Image"; // Placeholder jika gambar gagal dimuat
                      }}
                    />
                    <div className="p-4">
                      <p className="text-sm text-gray-500">{article.date}</p>
                      <h3 className="text-lg font-semibold text-gray-800 mt-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {article.description.length > 200
                          ? `${article.description.substring(0, 200)}...`
                          : article.description}
                      </p>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm text-purple-600 font-medium hover:underline"
                      >
                        See More
                      </a>
                    </div>
                  </div>
                ))}
              </div>
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
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 w-full md:w-2/3 lg:w-1/2 mx-auto">
              {/* Informasi kontak */}
              <div className="flex flex-col items-center md:items-start gap-4 text-sm text-gray-600">
                <div>
                  <h2 className="font-semibold text-gray-800">Alamat:</h2>
                  <p>Jl. Sehat No.123, Jakarta</p>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">
                    Nomor Telepon:
                  </h2>
                  <p>+62 21 1234 5678</p>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">Email:</h2>
                  <p>info@klinigma.com</p>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">
                    Jam Operasional:
                  </h2>
                  <p>Senin - Jumat: 08.00 - 17.00</p>
                  <p>Sabtu: 08.00 - 12.00</p>
                </div>
              </div>
              {/* Peta lokasi */}
              <div className="w-full">
                <iframe
                  src={mapUrl}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-md w-full h-64"
                ></iframe>
              </div>
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
