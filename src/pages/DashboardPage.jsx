import { Button } from "@/components/ui/button";
import { Bell, MapPin } from "lucide-react";
// import { fetchDataUsers } from "@/data/users";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarDays,
  MessageCircle,
  BookOpen,
  LocateIcon,
} from "lucide-react"; // Anda bisa mengganti ikon sesuai kebutuhan
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  // const { data } = fetchDataUsers();
  const navigate = useNavigate();
  let role = "";
  const handleLogout = () => {
    localStorage.removeItem("token");
    role = null;
    navigate("/login");
  };
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5855003249085!2d106.73948209999999!3d-6.1861864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f72a01b8f00d%3A0x7f87d867fb930560!2sPT.%20Kreasi%20Layanan%20Medis!5e0!3m2!1sen!2sid!4v1734104130782!5m2!1sen!2sid"; // Ganti dengan URL Google Maps Anda

  return (
    <div className="mx-auto">
      <section className="flex justify-between items-center p-6">
        <div className="flex gap-5">
          {/* Avatar with dropdown trigger */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded-full w-11 h-11 border-2 border-black cursor-pointer" />
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
            <p className="font-semibold">RYAN KUSUMA</p>
            <p className="text-xs">Laki Laki, 25 tahun</p>
          </div>
        </div>
        <Button variant="secondary" size="rounded">
          <Bell />
        </Button>
      </section>
      <section className="mb-5">
        <div className="w-full px-4">
          {/* <input type="text" placeholder="Search Anything" className="w-full p-2 rounded-lg border-2 shadow text-xs" /> */}
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-purple-900 to-purple-300 p-6 px-10">
            <h1 className="text-2xl text-gray-100 font-sans">
              Layanan Kesehatan
              <br /> Dalam Satu <br />
              Genggaman
            </h1>
            <img src="/klinigma.png" alt="" width={150} />
          </div>
        </div>
      </section>

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
          <LocateIcon className="text-purple-900" />
          <h1 className="text-center text-2xl">Lokasi Klinik</h1>
        </div>
        <div className="w-full flex justify-center md:w-2/3 lg:w-1/2 mx-auto pb-24">
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
  );
};

export default DashboardPage;
