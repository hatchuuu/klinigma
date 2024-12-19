"use client";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/button/NavigationButton";
import moment from "moment"; // Make sure you have moment.js installed

function BookingCreated() {
  const location = useLocation();
  const { bookingId } = location.state;
  const [bookingData, setBookingData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [poliklinikData, setPoliklinikData] = useState(null);
  const [dokterData, setDokterData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/bookings/${bookingId}`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data booking");
        }
        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        // Handle error appropriately, e.g., show an error message
      }
    };

    if (bookingId) {
      fetchBookingData();
    }
  }, [bookingId]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (bookingData) {
        try {
          const response = await fetch(
            `http://localhost:3002/users/${bookingData.userId}`
          );
          if (!response.ok) {
            throw new Error("Gagal mengambil data user");
          }
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [bookingData]);

  useEffect(() => {
    const fetchPoliklinikData = async () => {
      if (bookingData) {
        try {
          const response = await fetch(
            `http://localhost:3002/polyclinics/${bookingData.polyclinicId}`
          );
          if (!response.ok) {
            throw new Error("Gagal mengambil data poliklinik");
          }
          const data = await response.json();
          setPoliklinikData(data);
        } catch (error) {
          console.error("Error fetching poliklinik data:", error);
        }
      }
    };

    fetchPoliklinikData();
  }, [bookingData]);

  useEffect(() => {
    const fetchDokterData = async () => {
      if (bookingData) {
        try {
          const response = await fetch(
            `http://localhost:3002/doctors/${bookingData.doctorId}`
          );
          if (!response.ok) {
            throw new Error("Gagal mengambil data dokter");
          }
          const data = await response.json();
          setDokterData(data);
        } catch (error) {
          console.error("Error fetching dokter data:", error);
        }
      }
    };

    fetchDokterData();
  }, [bookingData]);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  if (!bookingData || !userData || !poliklinikData || !dokterData) {
    return <div>Loading...</div>;
  }

  const { queueNumber, scheduleDay, bookingDate } = bookingData;
  const { name: userName, birthDate } = userData;
  const { polyclinicName } = poliklinikData;
  const { name: dokterName, schedules } = dokterData;

  const jadwal = schedules.find((s) => s.day === scheduleDay);

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
          <strong>Poliklinik:</strong> {polyclinicName}
        </p>
        <p>
          <strong>Dokter:</strong> {dokterName}
        </p>
        <p>
          <strong>Tanggal:</strong> {bookingDate}
        </p>
        <p>
          <strong>Nomor Antrian Sekarang:</strong> {poliklinikData.currentQueue}
        </p>
        <p>
          <strong>Nomor Antrian Anda:</strong> {queueNumber}
        </p>
        <p>
          <strong>Jam Praktik:</strong> {jadwal.open} - {jadwal.close}
        </p>
        <div>
          <p>
            <strong>Nama:</strong> {userName}
          </p>
          <p>
            <strong>ID:</strong> {bookingData.userId}
          </p>
          <p>
            <strong>Umur:</strong>{" "}
            {moment().diff(moment(birthDate, "DDMMYYYY"), "years")}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={handleDashboard}>Kembali ke Dashboard</Button>
      </div>
    </div>
  );
}

export default BookingCreated;
