"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/id";
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

function BookingSchedule() {
  const location = useLocation();
  const navigate = useNavigate();
  const poliklinik = location.state?.poliklinik;

  const [tanggalTerpilih, setTanggalTerpilih] = useState(moment());
  const [dokterTerpilih, setDokterTerpilih] = useState(null);
  const [dataDokter, setDataDokter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    moment.locale("id");

    const fetchDokter = async () => {
      try {
        const response = await fetch("http://localhost:3002/doctors");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dokter");
        }
        const data = await response.json();
        setDataDokter(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDokter();
  }, []);

  if (isLoading) {
    return <div>Loading data dokter...</div>;
  }

  const dokterDiPoli = dataDokter.filter(
    (dokter) => dokter.polyclinicId === poliklinik.id
  );
  
  const handlePilihTanggal = (tanggal) => {
    setTanggalTerpilih(tanggal);
    setDokterTerpilih(null);
  };

  const handlePilihDokter = (dokter) => {
    let isAvailable = true;
    let availabilityMessage = "";

    const jamBuka = moment(dokter.schedule.open, "HH:mm");
    const jamTutup = moment(dokter.schedule.close, "HH:mm");

    if (jamTutup.isBefore(jamBuka)) {
      jamTutup.add(1, "day");
    }

    const now = moment();
    const open = moment(tanggalTerpilih).set({
      hour: jamBuka.hour(),
      minute: jamBuka.minute(),
    });
    const close = moment(tanggalTerpilih).set({
      hour: jamTutup.hour(),
      minute: jamTutup.minute(),
    });

    if (tanggalTerpilih.isSame(moment(), "day")) {
      isAvailable =
        dokter.availableDays.includes(tanggalTerpilih.day()) &&
        now.isBetween(open, close, undefined, "[]");

      if (!isAvailable) {
        availabilityMessage = dokter.availableDays.includes(tanggalTerpilih.day())
          ? "Tidak tersedia di jam ini"
          : "Tidak tersedia di hari ini";
      }
    } else {
      isAvailable = dokter.availableDays.includes(tanggalTerpilih.day());
      if (!isAvailable) {
        availabilityMessage = "Tidak tersedia di hari ini";
      }
    }

    if (isAvailable) {
      setDokterTerpilih(dokter);
    } else {
      console.error("Dokter tidak tersedia.", availabilityMessage);
      // Consider showing an alert or a more prominent error message to the user
    }
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true); // Menampilkan loading indicator
  
    try {
      // 1. Mengurangi kuota dokter di database
      const response = await fetch(`http://localhost:3002/doctors/${dokterTerpilih.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quota: dokterTerpilih.quota - 1,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Gagal memperbarui kuota dokter");
      }
  
      // 2. Membuat data booking baru
      const bookingData = {
        poliklinik: {
          id: poliklinik.id,
          polyName: poliklinik.polyName,
        },
        tanggalTerpilih: tanggalTerpilih.format("YYYY-MM-DD"),
        dokterTerpilih: {
          id: dokterTerpilih.id,
          name: dokterTerpilih.name,
        },
      };
  
      // 3. Navigasi ke halaman BookingDetails
      navigate("/booking/schedule/details", { state: bookingData });
    } catch (error) {
      console.error(error);
      // Tampilkan pesan error ke user (misalnya, dengan alert)
    } finally {
      setIsLoading(false); // Menyembunyikan loading indicator
    }
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
            {poliklinik.polyName}
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
          const tanggal = moment().add(hari, "days");
          const isActive = tanggal.isSame(tanggalTerpilih, "day");

          return (
            <div
              key={hari}
              className={`card-tanggal p-4 border rounded-lg shadow-md cursor-pointer ${
                isActive
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
            const jamBuka = moment(dokter.schedule.open, "HH:mm");
            const jamTutup = moment(dokter.schedule.close, "HH:mm");
            const sisaKuota = dokter.quota - 10;

            if (jamTutup.isBefore(jamBuka)) {
              jamTutup.add(1, "day");
            }

            let isAvailable = dokter.availableDays.includes(tanggalTerpilih.day());
            let availabilityMessage = "";

            if (tanggalTerpilih.isSame(moment(), "day")) {
              const now = moment(); 
              const open = moment(tanggalTerpilih).set({
                hour: jamBuka.hour(),
                minute: jamBuka.minute(),
              });
              const close = moment(tanggalTerpilih).set({
                hour: jamTutup.hour(),
                minute: jamTutup.minute(),
              });

              isAvailable =
                isAvailable && now.isBetween(open, close, undefined, "[]");

              if (!isAvailable) {
                availabilityMessage = dokter.availableDays.includes(tanggalTerpilih.day())
                  ? "Tidak tersedia di jam ini"
                  : "Tidak tersedia di hari ini";
              }
            } else if (!isAvailable) {
              availabilityMessage = "Tidak tersedia di hari ini";
            }


            return (
              <Drawer key={dokter.id}>
                <DrawerTrigger asChild>
                  <div
                    key={dokter.id}
                    className={`card-dokter p-4 border rounded-lg shadow-md cursor-pointer flex items-center gap-3 
                      ${
                        dokter.id === dokterTerpilih?.id
                          ? "bg-blue-500 text-white"
                          : "bg-white dark:bg-gray-800"
                      } 
                      ${
                        isAvailable ? "" : "opacity-50 cursor-not-allowed" 
                      }`}
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
                        {jamBuka.format("HH:mm")} - {jamTutup.format("HH:mm")}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sisa Kuota: {sisaKuota}
                      </p>
                      {!isAvailable && (
                        <p className="text-sm text-red-500">
                          {availabilityMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </DrawerTrigger>
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
                      <strong>Poliklinik:</strong> {poliklinik.polyName}
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
                  </div>
                  <DrawerFooter>
                    <Button onClick={handleConfirmBooking}>Lanjut</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BookingSchedule;