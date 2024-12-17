"use client";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/button/NavigationButton";

function BookingDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { poliklinik, tanggalTerpilih, dokterTerpilih } = location.state;
  const [nomorAntrian, setNomorAntrian] = useState(null);

  useEffect(() => {
    const generateNomorAntrian = async () => {
      try {
        // Logika untuk mendapatkan nomor antrian (misalnya, dari API)
        const response = await fetch("http://localhost:3002/bookings");
        const data = await response.json();
        const nomor = data.length + 1; // Contoh sederhana, sesuaikan dengan kebutuhan
        setNomorAntrian(nomor);
      } catch (error) {
        console.error("Gagal mendapatkan nomor antrian:", error);
        // Tampilkan pesan error ke user
      }
    };

    generateNomorAntrian();
  }, []);

  const handleBooking = async () => {
    try {
      // Kirim data booking ke server (misalnya, dengan POST request)
      const response = await fetch("http://localhost:3002/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ... data booking yang akan dikirim ...
          polyName: poliklinik.polyName,
          // ... data lainnya ...
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal membuat booking");
      }

      // Redirect ke halaman sukses atau halaman lainnya
      navigate("/booking/success"); 
    } catch (error) {
      console.error("Gagal membuat booking:", error);
      // Tampilkan pesan error ke user
    }
  };

  return (
    <div className="mx-auto p-6">
      <div className="flex items-center mb-6">
        <BackButton path="/booking/schedule" />
        <h1 className="font-bold font-sans text-2xl ml-4">
          Detail Booking
        </h1>
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
        {nomorAntrian && (
          <p>
            <strong>Nomor Antrian:</strong> {nomorAntrian}
          </p>
        )}
      </div>

      <div className="mt-8">
        <Button onClick={handleBooking}>Konfirmasi Booking</Button>
      </div>
    </div>
  );
}

export default BookingDetails;