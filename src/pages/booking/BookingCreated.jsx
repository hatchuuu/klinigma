"use client";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/button/NavigationButton";

function BookingCreated() {
  const location = useLocation();
  const navigate = useNavigate();
  const { poliklinik, tanggalTerpilih, dokterTerpilih } = location.state;
  const [nomorAntrian, setNomorAntrian] = useState(null);
  const [currentQueue, setCurrentQueue] = useState(null); 
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        // 1. Mendapatkan nomor antrian dari API (misalnya, dari response POST sebelumnya)
        const response = await fetch("http://localhost:3002/bookings"); 
        const bookingsData = await response.json();
        const latestBooking = bookingsData[bookingsData.length - 1];
        setNomorAntrian(latestBooking.queueNumber);

        // 2. Mendapatkan currentQueue dari poliklinik
        const polyclinicResponse = await fetch(
          `http://localhost:3002/polyclinics/${poliklinik.id}`
        );
        const polyclinicData = await polyclinicResponse.json();
        setCurrentQueue(polyclinicData.currentQueue);

        // 3. Mendapatkan data user (misalnya, dari local storage atau API)
        const userId = "3456"; // Ganti dengan ID user yang login
        const userResponse = await fetch(`http://localhost:3002/users/${userId}`);
        const userData = await userResponse.json();
        setUserData(userData);
      } catch (error) {
        console.error("Gagal mengambil data booking:", error);
        // Tampilkan pesan error ke user
      }
    };

    fetchBookingData();
  }, []);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="mx-auto p-6">
      <div className="flex items-center mb-6">
        <BackButton path="/booking/schedule" />
        <h1 className="font-bold font-sans text-2xl ml-4">
          Booking Berhasil Dibuat
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
        {currentQueue && (
          <p>
            <strong>Antrian Saat Ini:</strong> {currentQueue}
          </p>
        )}
        {userData && (
          <div>
            <p>
              <strong>Nama:</strong> {userData.name}
            </p>
            <p>
              <strong>ID:</strong> {userData.id}
            </p>
            <p>
              <strong>Umur:</strong>{" "}
              {moment().diff(moment(userData.birthDate, "DDMMYYYY"), "years")}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Button onClick={handleDashboard}>Kembali ke Dashboard</Button>
      </div>
    </div>
  );
}

export default BookingCreated;