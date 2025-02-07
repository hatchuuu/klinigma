import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL); // Pastikan `VITE_SOCKET_URL` benar

const TokenBoard = ({ latestBooking }) => {
  const [number, setNumber] = useState(latestBooking.polyQueue)
  // const [number, setNumber] = useState(latestBooking.polyQueue)

  // useEffect(() => {
  //   let isMounted = true;

  //   socket.emit("joinRoom", latestBooking.polyclinicId);

  //   socket.on("updateQueue", (updatedNumber) => {
  //     if (isMounted) setNumber(updatedNumber);
  //   });

  //   return () => {
  //     isMounted = false;
  //     socket.off("updateQueue");
  //   };
  // }, [latestBooking.id]);

  return (
    <section className="py-8 px-4 sm:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Antrean Sekarang */}
        <div className="rounded-xl shadow-xl bg-white overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-6">
            <p className="sm:text-2xl text-base text-white font-semibold text-center">
              Antrean Sekarang
            </p>
          </div>
          <div className="flex justify-center items-center p-5">
            <p className="sm:text-6xl text-lg font-extrabold text-gray-900">
              {number}
            </p>
          </div>
        </div>
        {/* Antrean Kamu */}
        <div className="rounded-xl shadow-xl bg-white overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-3">
            <p className="sm:text-2xl text-base text-white font-semibold text-center">
              Antrean Kamu
            </p>
          </div>
          <div className="flex flex-col items-center p-5">
            <p className="sm:text-6xl text-lg font-extrabold text-gray-900">
              {latestBooking.queueNumber || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Pastikan hadir sebelum nomor ini dipanggil.
            </p>
          </div>
        </div>
      </div>
    </section>

  );
};

export default TokenBoard;
