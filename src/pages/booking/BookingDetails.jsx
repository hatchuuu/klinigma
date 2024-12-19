"use client";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/button/NavigationButton";

function BookingDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { poliklinik, tanggalTerpilih, dokterTerpilih, jadwal } =
    location.state;

  const handleBooking = async () => {
    try {
      // Ambil data poliklinik (hanya untuk mengambil currentQueue)
      const responsePoliklinik = await fetch(
        `http://localhost:3002/polyclinics/${poliklinik.id}`
      );
      const dataPoliklinik = await responsePoliklinik.json();

      // Generate queueNumber (sesuaikan dengan logika aplikasi kamu)
      const queueNumber = dataPoliklinik.currentQueue + 1;

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
        bookingDate: tanggalTerpilih,
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
        throw new Error("Gagal membuat booking");
      }

      const newBooking = await responseBooking.json(); // Get the new booking data with ID


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
              schedules: updatedDokter.schedules
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
          bookingId: newBooking.id
        },
      });
    } catch (error) {
      console.error("Gagal membuat booking:", error);
      // Tampilkan pesan error ke user
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

      <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
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

      <div className="mt-8">
        <Button onClick={handleBooking}>Konfirmasi Booking</Button>
      </div>
    </div>
  );
}

export default BookingDetails;
