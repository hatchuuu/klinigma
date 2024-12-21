"use client";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/button/NavigationButton";
import dayjs from "dayjs";

function BookingDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { poliklinik, tanggalTerpilih, dokterTerpilih, jadwal } =
    location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

      let queueNumber = 1; // Default jika belum ada antrian

      if (dataQueue.length > 0) {
        // Jika sudah ada antrian, ambil currentQueue dan increment
        queueNumber = dataQueue[0].currentQueue + 1;
      }

      // Buat data booking
      const bookingData = {
        polyclinicId: poliklinik.id,
        doctorId: dokterTerpilih.id,
        userId: "3456", // Ganti dengan ID user yang login
        name: "Nama User", // Ganti dengan nama user yang login
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "Waiting",
        queueNumber: queueNumber,
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
      console.log("New booking:", newBooking); // Cek data booking yang baru dibuat

      // --- Buat data antrian baru ---
      const createQueueResponse = await fetch("http://localhost:3002/queues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          polyclinicId: poliklinik.id,
          date: formattedDate,
          currentQueue: queueNumber, // Pastikan queueNumber sudah di-increment
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

      // *** TAMBAHKAN KONDISI INI ***
      if (updatedDokter && updatedDokter.schedules) {
        const jadwalIndex = updatedDokter.schedules.findIndex(
          (s) => s.day === jadwal.hari
        );

        if (jadwalIndex !== -1) {
          updatedDokter.schedules[jadwalIndex].booked += 1;
          updatedDokter.schedules[jadwalIndex].quota -= 1; // Kurangi quota

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
          // Handle error, misalnya tampilkan pesan error ke user
        }
      } else {
        console.error("dokterTerpilih.schedules is undefined");
        // Handle error, misalnya tampilkan pesan error ke user
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
      // Tampilkan pesan error ke user
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mx-auto p-6">
      <div className="flex items-center mb-6">
        <BackButton path="/booking/schedule" />
        <h1 className="font-bold font-sans text-2xl ml-4">Detail Booking</h1>
        <div className="ml-auto">
          <img src="/klinigma.png" alt="Klinigma" width={90} />
        </div>
      </div>

      <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Ringkasan Booking:
        </h3>
        <p>
          <strong>Poliklinik:</strong> {poliklinik.polyName}
        </p>
        <p>
          <strong>Dokter:</strong> {dokterTerpilih.name}
        </p>
        <p>
          <strong>Tanggal:</strong> {tanggalTerpilih}
        </p>
        <p>
          <strong>Jadwal Praktik:</strong> {jadwal.jamBuka} - {jadwal.jamTutup}
        </p>
      </div>

      <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Detail Pasien:
        </h3>
      </div>

      <div className="mt-8">
        <Button onClick={handleBooking} disabled={isLoading}>
          {isLoading ? "Loading ..." : "Konfirmasi Booking"}
        </Button>
      </div>
    </div>
  );
}

export default BookingDetails;
