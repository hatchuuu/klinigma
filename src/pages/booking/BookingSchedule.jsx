"use client";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

function BookingSchedule() {
  const location = useLocation();
  const navigate = useNavigate();
  const poliklinik = location.state?.poliklinik;

  const [tanggalTerpilih, setTanggalTerpilih] = useState(moment());
  const [dokterTerpilih, setDokterTerpilih] = useState(null);
  const [dataDokter, setDataDokter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer visibility

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
    (dokter) => dokter.polyName === poliklinik.polyName
  );

  const handlePilihTanggal = (tanggal) => {
    setTanggalTerpilih(tanggal);
  };

  const handlePilihDokter = (dokter) => {
    setDokterTerpilih(dokter);
    setIsDrawerOpen(true);
  };

  const handleConfirmBooking = () => {
    // Create a simplified booking object
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

    navigate("/ringkasan-booking", { state: bookingData });
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
      <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {poliklinik.polyName}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {poliklinik.descriptions}
        </p>
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
          {dokterDiPoli.map((dokter) => (
            // <Drawer>
            // <DrawerClose/>
            <Drawer key={dokter.id}>
              <DrawerTrigger asChild>
                <div
                  key={dokter.id}
                  className={`card-dokter p-4 border rounded-lg shadow-md cursor-pointer flex items-center gap-3 ${
                    dokter.id === dokterTerpilih?.id
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-gray-800"
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
                  <Button onClick={handleConfirmBooking}>
                    Lanjut
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingSchedule;
