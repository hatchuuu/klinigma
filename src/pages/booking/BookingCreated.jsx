"use client";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/button/NavigationButton";
import moment from "moment"; // Make sure you have moment.js installed
import { Card } from "@/components/ui/card";

function BookingCreated() {
  const location = useLocation();
  const { bookingId } = location.state;
  const [bookingData, setBookingData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [poliklinikData, setPoliklinikData] = useState(null);
  const [dokterData, setDokterData] = useState(null);
  const [antrianData, setAntrianData] = useState(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookingData = async () => {
      if (bookingId) {
        try {
          const response = await fetch(
            `http://localhost:3002/bookings/${bookingId}`
          );
          if (!response.ok) {
            throw new Error("Gagal mengambil data booking");
          }
          const data = await response.json();
          setBookingData(data);
          console.log("Booking data:", data);
        } catch (error) {
          console.error("Error fetching booking data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBookingData();
  }, [bookingId]);

  useEffect(() => {
    const fetchData = async () => {
      if (bookingId) {
        setIsLoading(true);

        try {
          const bookingResponse = await fetch(
            `http://localhost:3002/bookings/${bookingId}`
          );

          if (!bookingResponse.ok) {
            throw new Error("Gagal mengambil data booking!");
          }

          const bookingData = await bookingResponse.json();
          setBookingData(bookingData);

          const [
            userResponse,
            poliklinikResponse,
            dokterResponse,
            antrianResponse,
          ] = await Promise.all([
            fetch(`http://localhost:3002/users/${bookingData.userId}`),
            fetch(
              `http://localhost:3002/polyclinics/${bookingData.polyclinicId}`
            ),
            fetch(`http://localhost:3002/doctors/${bookingData.doctorId}`),
            fetch(
              `http://localhost:3002/queues?polyclinicId=${bookingData.polyclinicId}&date=${bookingData.bookingDate}`
            ),
          ]);

          if (!userResponse.ok) {
            throw new Error("Gagal mengambil data user");
          }
          if (!poliklinikResponse.ok) {
            throw new Error("Gagal mengambil data poliklinik");
          }
          if (!dokterResponse.ok) {
            throw new Error("Gagal mengambil data dokter");
          }
          if (!antrianResponse.ok) {
            throw new Error("Gagal mengambil data antrian");
          }

          const [userData, poliklinikData, dokterData, antrianData] =
            await Promise.all([
              userResponse.json(),
              poliklinikResponse.json(),
              dokterResponse.json(),
              antrianResponse.json(),
            ]);

          setUserData(userData);
          setPoliklinikData(poliklinikData);
          setDokterData(dokterData);
          setAntrianData(antrianData[0]);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [bookingId]);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const { queueNumber, scheduleDay, bookingDate } = bookingData;
  const { name: userName, birthDate } = userData || {};
  const { polyclinicName } = poliklinikData || {};
  const { name: dokterName, schedules } = dokterData || {};

  const jadwal = (schedules || []).find((s) => s.day === scheduleDay);

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

      <main className="bg-neutral-50 p-4">
        <div className="bg-purple-400 p-4 rounded-lg shadow">
          <div className="w-full bg-white rounded-lg flex items-center justify-between relative">
            <div className="w-[24px] h-[24px] bg-purple-400 rounded-lg absolute -left-[12px] top-1/2 -translate-y-1/2"></div>
            <div className="p-4 w-full text-center">
              <p className="text-neutral-500 text-sm">Antrian Sekarang</p>
              <p className="text-primary-500 text-4xl font-title">
                {antrianData?.currentQueue || "Loading..."}
              </p>
            </div>
            <div className="w-[24px] h-[24px] bg-purple-400 rounded-lg absolute -right-[12px] top-1/2 -translate-y-1/2"></div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-neutral-100 text-sm">Nomor Antrian Anda</p>
            <p className="text-neutral-100 text-4xl font-title">{queueNumber}</p>
          </div>
        </div>
      </main>

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
          <strong>Jam Praktik:</strong> {jadwal && jadwal.open} -{" "}
          {jadwal && jadwal.close}
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
