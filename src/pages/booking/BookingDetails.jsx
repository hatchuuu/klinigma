import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "@/components/button/NavigationButton";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { jwtDecode } from "jwt-decode";
import { successToast } from "@/lib/toaster";

dayjs.locale("id");

function BookingDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { poliklinik, tanggalTerpilih, dokterTerpilih, jadwal } =
    location.state;

  const token = sessionStorage.getItem("token")
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data user yang sedang login
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        if (token) {
          const { id } = jwtDecode(token)
          const response = await fetch(`http://localhost:3002/users/${id}`); // Ganti dengan ID user yang sedang login
          if (!response.ok) {
            throw new Error("Gagal mengambil data user");
          }
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error("Token tidak ada");
        }
      } catch (error) {
        setError("Gagal mengambil data user. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleBooking = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const tanggalTerpilihDayjs = dayjs(tanggalTerpilih); // Konversi ke object dayjs
      const formattedDate = tanggalTerpilihDayjs.format("YYYY-MM-DD");

      // 1. Ambil data antrian dari database
      const responseQueue = await fetch(
        `http://localhost:3002/queues?polyclinicId=${poliklinik.id}&date=${formattedDate}`
      );
      const dataQueue = await responseQueue.json();

      // const biggestNumber = dataQueue.reduce((max, obj) => {
      //   return obj.currentQueue > max.currentQueue ? obj : max;
      // }, dataQueue[0]); // Mulai dengan elemen pertama
      let queueNumber = 1;
      if (dataQueue.length > 0) {
        queueNumber = Math.max(...dataQueue.map(obj => obj.currentQueue));
      }

      // Buat data booking
      const bookingData = {
        polyclinicId: poliklinik.id,
        doctorId: dokterTerpilih.id,
        userId: user ? user.id : "", // Ganti dengan ID user yang login
        name: user ? user.name : "", // Ganti dengan nama user yang login
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "Waiting",
        queueNumber: queueNumber + 1,
        scheduleDay: jadwal.hari,
        bookingDate: formattedDate,
      };

      // Kirim data booking ke server
      const responseBooking = await fetch("http://localhost:3002/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!responseBooking.ok) {
        const errorData = await responseBooking.json(); // Ambil pesan error dari server
        throw new Error(
          `Gagal membuat booking: ${errorData.message || "Unknown error"}`
        );
      }

      const newBooking = await responseBooking.json(); // Get the new booking data with ID
      console.log({ newBooking })
      // --- Buat data antrian baru ---
      const createQueueResponse = await fetch("http://localhost:3002/queues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          polyclinicId: poliklinik.id,
          date: formattedDate,
          currentQueue: queueNumber + 1, // Pastikan queueNumber sudah di-increment
        }),
      });

      if (!createQueueResponse.ok) {
        const errorData = await createQueueResponse.json(); // Ambil pesan error dari server (jika ada)
        throw new Error(
          `Gagal membuat antrian: ${errorData.message || "Unknown error"}`
        );
      }

      // Update booked dan quota di jadwal dokter
      const updatedDokter = { ...dokterTerpilih };

      if (updatedDokter && updatedDokter.schedules) {
        const jadwalIndex = updatedDokter.schedules.findIndex(
          (s) => s.day === jadwal.hari
        );

        if (jadwalIndex !== -1) {
          updatedDokter.schedules[jadwalIndex].booked += 1;
          // updatedDokter.schedules[jadwalIndex].quota -= 1; // Kurangi quota

          await fetch(`http://localhost:3002/doctors/${dokterTerpilih.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              schedules: updatedDokter.schedules,
            }),
          });
        } else {
          console.error("Jadwal tidak ditemukan di dokterTerpilih.schedules");
        }
      } else {
        console.error("dokterTerpilih.schedules is undefined");
      }

      // Redirect ke halaman sukses dengan data booking
      navigate("/booking/schedule/details/created", {
        state: {
          bookingId: newBooking.id,
        },
      });
    } catch (error) {
      console.error("Gagal membuat booking:", error);
      setError("Gagal membuat booking. Silahkan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const formattedTanggal = dayjs(tanggalTerpilih).format("dddd, D MMMM YYYY");

  return (
    <div className="mx-auto p-6">
      <div className="flex items-center mb-6">
        <BackButton path="/booking/schedule" />
        <h1 className="font-bold font-sans text-2xl ml-4">Ringkasan Booking</h1>
        <div className="ml-auto">
          <img src="/klinigma.png" alt="Klinigma" width={90} />
        </div>
      </div>

      <div className="w-full bg-white rounded-lg shadow p-6">
        <div className="flex flex-col gap-8">
          {/* Detail Booking */}
          <div className="w-full bg-white rounded-md shadow p-6 border">
            <h2 className="text-xl font-title text-neutral-950 mb-4 text-center">
              Detail Booking
            </h2>
            <div className="flex justify-between mb-3">
              <p className="text-neutral-500">Poliklinik</p>
              <p className="text-neutral-950">{poliklinik.polyName}</p>
            </div>
            <div className="flex justify-between mb-3">
              <p className="text-neutral-500">Tanggal</p>
              <p className="text-neutral-950">{formattedTanggal}</p>
            </div>
            <div className="flex justify-between mb-3">
              <p className="text-neutral-500">Dokter</p>
              <p className="text-neutral-950">{dokterTerpilih.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-neutral-500">Jadwal</p>
              <p className="text-neutral-950">
                {jadwal.jamBuka} - {jadwal.jamTutup}
              </p>
            </div>
          </div>

          {/* Identitas Pasien */}
          <div className="w-full bg-white rounded-md shadow p-6 border">
            <h2 className="text-xl font-title text-neutral-950 mb-4 text-center">
              Identitas Pasien
            </h2>
            <div className="flex flex-col items-center gap-4 mb-6">
              <img
                src={
                  user?.avatar
                    ? user.avatar
                    : "https://tools-api.webcrumbs.org/image-placeholder/80/80/avatars/3"
                }
                alt="Patient Avatar"
                className="w-[80px] h-[80px] rounded-full object-contain"
              />
              <div className="text-center">
                <p className="text-neutral-950 font-bold mb-2">
                  {user ? user.name : "Test"}
                </p>
                <p className="text-neutral-500">
                  ID: {user ? user.phoneNumber : "123456789"}
                </p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-3">
                <p className="text-neutral-500">Jenis Kelamin</p>
                <p className="text-neutral-950">
                  {user ? user.gender : "01 Jan 1990"}
                </p>
              </div>
              <div className="flex justify-between mb-3">
                <p className="text-neutral-500">Tanggal Lahir</p>
                <p className="text-neutral-950">
                  {user ? user.birthDate : "+1 234 567 890"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-neutral-500">Alamat</p>
                <p className="text-neutral-950">
                  {user ? user.location : "1234 Elm St, Springfield"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <button
              onClick={handleBooking}
              disabled={isLoading}
              className="px-6 py-2 text-white bg-primary rounded-lg"
            >
              {isLoading ? "Memproses..." : "Booking Sekarang"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
