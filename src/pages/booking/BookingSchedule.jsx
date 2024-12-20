"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import isBetween from "dayjs/plugin/isBetween";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { BackButton } from "@/components/button/NavigationButton";
import { SquarePen } from "lucide-react";

dayjs.extend(isBetween);
dayjs.locale("id");

function convertDayToIndonesian(day) {
  const days = {
    Sunday: "Minggu",
    Monday: "Senin",
    Tuesday: "Selasa",
    Wednesday: "Rabu",
    Thursday: "Kamis",
    Friday: "Jumat",
    Saturday: "Sabtu",
  };
  return days[day] || day;
}

function BookingSchedule() {
  const location = useLocation();
  const navigate = useNavigate();
  const { poliklinik } = location.state || {};

  useEffect(() => {
    if (!poliklinik) {
      navigate("/booking");
    }
  }, [poliklinik]);

  const [loading, setLoading] = useState({ isLoading: true, dayjs: null });
  const [tanggalTerpilih, setTanggalTerpilih] = useState(null);
  const [dokterTerpilih, setDokterTerpilih] = useState(null);
  const [dataDokter, setDataDokter] = useState([]);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    async function init() {
      const dayjsModule = await import("dayjs");
      await import("dayjs/locale/id");
      dayjsModule.default.locale("id");
      setLoading({ isLoading: false, dayjs: dayjsModule.default });
      setTanggalTerpilih(dayjsModule.default());
    }
    init();
  }, []);

  useEffect(() => {
    const fetchDokter = async () => {
      if (!loading.isLoading) {
        try {
          const response = await fetch("http://localhost:3002/doctors");
          if (!response.ok) {
            throw new Error("Gagal mengambil data dokter");
          }
          setDataDokter(await response.json());
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchDokter();
  }, [loading.isLoading]);

  if (loading.isLoading) {
    return <div>Loading...</div>;
  }

  const dokterDiPoli = dataDokter.filter(
    (dokter) => dokter.polyclinicId === poliklinik.id
  );

  const handlePilihTanggal = (tanggal) => {
    setTanggalTerpilih(tanggal);
    setDokterTerpilih(null);
  };

  const handlePilihDokter = (dokter) => {
    setDokterTerpilih(dokter);
  };

  const handleConfirmBooking = async () => {
    setIsBooking(true);

    try {
      const hariInggris = tanggalTerpilih.format("dddd");
      const hariIndonesia = convertDayToIndonesian(hariInggris);
      const jadwalHariIni = dokterTerpilih.schedules.find(
        (s) => s.day === hariIndonesia
      );

      if (!jadwalHariIni) {
        throw new Error("Jadwal tidak ditemukan.");
      }

      const bookingData = {
        poliklinik: {
          id: poliklinik.id,
          polyName: poliklinik.polyclinicName,
        },
        tanggalTerpilih: tanggalTerpilih.format("YYYY-MM-DD"),
        dokterTerpilih: {
          id: dokterTerpilih.id,
          name: dokterTerpilih.name,
          schedules: dokterTerpilih.schedules,
        },
        jadwal: {
          hari: hariIndonesia,
          jamBuka: jadwalHariIni.open,
          jamTutup: jadwalHariIni.close,
          quota: jadwalHariIni.quota,
          booked: jadwalHariIni.booked,
        },
      };

      navigate("/booking/schedule/details", { state: bookingData });
    } catch (error) {
      console.error(error);
    } finally {
      setIsBooking(false);
    }
  };

  const isDoctorAvailable = (dokter) => {
    const hariInggris = tanggalTerpilih.format("dddd");
    const hariIndonesia = convertDayToIndonesian(hariInggris);
    const jadwalHariIni = dokter.schedules.find((s) => s.day === hariIndonesia);

    if (!jadwalHariIni) {
      return false; // Dokter tidak tersedia di hari ini
    }

    if (tanggalTerpilih.isSame(loading.dayjs(), "day")) {
      // Periksa apakah jadwal dokter sudah lewat untuk hari ini
      const now = loading.dayjs();
      const [openHour, openMinute] = jadwalHariIni.open.split(":").map(Number);
      const [closeHour, closeMinute] = jadwalHariIni.close
        .split(":")
        .map(Number);

      const jamBuka = loading
        .dayjs() // Use loading.dayjs() here
        .set("hour", openHour)
        .set("minute", openMinute);
      let jamTutup = loading
        .dayjs() // Use loading.dayjs() here
        .set("hour", closeHour)
        .set("minute", closeMinute);

      if (jamTutup.isBefore(jamBuka)) {
        jamTutup = jamTutup.add(1, "day");
      }

      return now.isBetween(jamBuka, jamTutup, null, "[]");
    }

    return true;
  };

  return (
    <div className="mx-auto p-6">
      <div className="flex items-center mb-6">
        <BackButton path="/booking" />
        <h1 className="font-bold font-sans text-2xl ml-4">
          Pilih Jadwal & Dokter
        </h1>
        <div className="ml-auto">
          <img src="/klinigma.png" alt="Klinigma" width={90} />
        </div>
      </div>

      {/* Card Poliklinik */}
      <div className="p-4 border flex rounded-lg shadow-md bg-white dark:bg-gray-800">
        <div className="w-[85%]">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {poliklinik.polyclinicName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {poliklinik.descriptions}
          </p>
        </div>
        <div className="m-auto text-purple-950 font-bold">
          <Link to={"/booking"} className="flex flex-col items-center">
            <SquarePen className="text-center" />
            <span className="">Ubah</span>
          </Link>
        </div>
      </div>

      {/* Pilihan Tanggal */}
      <h1 className="my-6 text-lg font-semibold">Pilih Jadwal</h1>
      <div className="flex gap-4 mt-4">
        {[0, 1, 2].map((hari) => {
          const tanggal = loading.dayjs().add(hari, "days");
          const isActive = tanggal.isSame(tanggalTerpilih, "day");

          return (
            <div
              key={hari}
              className={`card-tanggal p-4 border rounded-lg shadow-md cursor-pointer ${isActive
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800"
                }`}
              onClick={() => handlePilihTanggal(tanggal)}
            >
              {tanggal.format("dddd, DD MMMM YYYY")}
            </div>
          );
        })}
      </div>

      {/* Pilih Jadwal Dokter */}
      <div className="my-6">
        <h1 className="my-6 text-lg font-semibold">Pilih Dokter</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pb-8">
          {dokterDiPoli.map((dokter) => {
            const hariInggris = tanggalTerpilih.format("dddd");
            const hariIndonesia = convertDayToIndonesian(hariInggris);
            const jadwalHariIni = dokter.schedules.find(
              (s) => s.day === hariIndonesia
            );

            let formattedOpenTime = "Invalid Date";
            let formattedCloseTime = "Invalid Date";

            if (jadwalHariIni) {
              try {
                const today = loading.dayjs();
                formattedOpenTime = today
                  .set("hour", parseInt(jadwalHariIni.open.split(":")[0]))
                  .set("minute", parseInt(jadwalHariIni.open.split(":")[1]))
                  .format("HH:mm");

                formattedCloseTime = today
                  .set("hour", parseInt(jadwalHariIni.close.split(":")[0]))
                  .set("minute", parseInt(jadwalHariIni.close.split(":")[1]))
                  .add(jadwalHariIni.close < jadwalHariIni.open ? 1 : 0, "day")
                  .format("HH:mm");
              } catch (error) {
                console.error("Error parsing time:", error, jadwalHariIni);
              }
            }

            const isAvailable = isDoctorAvailable(dokter);
            const availabilityMessage = isAvailable
              ? "Dokter tersedia di jam ini"
              : jadwalHariIni
                ? "Dokter tidak tersedia di jam ini" // Dokter ada jadwal, tapi di luar jam praktek
                : "Dokter tidak tersedia di hari ini"; // Dokter tidak ada jadwal di hari ini
            return (
              <div key={dokter.id}>
                <Drawer key={dokter.id}>
                  {isAvailable ? (
                    <DrawerTrigger asChild>
                      <div
                        key={dokter.id}
                        className={`card-dokter p-4 border rounded-lg shadow-md cursor-pointer flex items-center gap-3 
                        ${dokter.id === dokterTerpilih?.id
                            ? "bg-blue-500 text-white"
                            : "bg-white dark:bg-gray-800"
                          } 
                        ${isAvailable ? "" : "opacity-50 cursor-not-allowed"} 
                      `}
                        onClick={() => handlePilihDokter(dokter)}
                      >
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={dokter.image} alt={dokter.name} />
                          <AvatarFallback>{dokter.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {dokter.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {jadwalHariIni
                              ? `${formattedOpenTime} - ${formattedCloseTime}`
                              : "Tidak ada jadwal"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Sisa Kuota:{" "}
                            {jadwalHariIni
                              ? jadwalHariIni.quota - jadwalHariIni.booked
                              : "N/A"}
                          </p>
                          {!isAvailable && (
                            <p className="text-sm text-red-500">
                              {availabilityMessage}
                            </p>
                          )}
                        </div>
                      </div>
                    </DrawerTrigger>
                  ) : (
                    <div // div biasa jika dokter tidak tersedia
                      key={dokter.id}
                      className={`card-dokter p-4 border rounded-lg shadow-md cursor-not-allowed flex items-center gap-3 
                      ${dokter.id === dokterTerpilih?.id
                          ? "bg-blue-500 text-white"
                          : "bg-white dark:bg-gray-800"
                        } opacity-50 `}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {" "}
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={dokter.image} alt={dokter.name} />
                        <AvatarFallback>{dokter.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {dokter.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {jadwalHariIni
                            ? `${formattedOpenTime} - ${formattedCloseTime}`
                            : "Tidak ada jadwal"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Sisa Kuota:{" "}
                          {jadwalHariIni
                            ? jadwalHariIni.quota - jadwalHariIni.booked
                            : "N/A"}
                        </p>
                        {!isAvailable && (
                          <p className="text-sm text-red-500">
                            {availabilityMessage}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  <DrawerContent>
                    <DrawerClose />
                    <DrawerHeader>
                      <DrawerTitle>Ringkasan Booking</DrawerTitle>
                      <DrawerDescription>
                        Berikut adalah ringkasan booking Anda:
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <p>
                        <strong>Poliklinik:</strong> {poliklinik.polyclinicName}
                      </p>
                      {dokterTerpilih ? (
                        <p>
                          <strong>Dokter:</strong> {dokterTerpilih.name}
                        </p>
                      ) : (
                        <p>Loading data dokter...</p>
                      )}
                      <p>
                        <strong>Tanggal:</strong>{" "}
                        {tanggalTerpilih.format("dddd, DD MMMM YYYY")}
                      </p>
                      <p>
                        <strong>Jadwal Praktik:</strong>{" "}
                        {jadwalHariIni
                          ? `${formattedOpenTime} - ${formattedCloseTime}`
                          : "Tidak ada jadwal"}
                      </p>
                      <p>
                        <strong>Total Antrean:</strong>{" "}
                        {jadwalHariIni?.booked || "N/A"}
                      </p>
                      <p>
                        <strong>Sisa Kuota:</strong>{" "}
                        {jadwalHariIni
                          ? jadwalHariIni.quota - jadwalHariIni.booked
                          : "N/A"}
                      </p>
                    </div>
                    <DrawerFooter>
                      <Button
                        onClick={handleConfirmBooking}
                        disabled={isBooking}
                      >
                        {isBooking ? "Loading..." : "Lanjut"}
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BookingSchedule;
