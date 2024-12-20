import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL); // Pastikan `VITE_SOCKET_URL` benar

const TokenBoard = ({ latestBooking }) => {
  const [number, setNumber] = useState(latestBooking.polyQueue)

  useEffect(() => {
    let isMounted = true;

    socket.emit("joinRoom", latestBooking.polyclinicId);

    socket.on("updateQueue", (updatedNumber) => {
      if (isMounted) setNumber(updatedNumber);
    });

    return () => {
      isMounted = false;
      socket.off("updateQueue");
    };
  }, [latestBooking.id]);

  return (
    <section className="py-8 px-4 sm:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Antrean Sekarang */}
        <div className="rounded-lg shadow-lg bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4">
            <p className="text-xl sm:text-2xl text-white font-semibold">
              Antrean Sekarang
            </p>
          </div>
          <div className="flex justify-center items-center p-6">
            <p className="text-6xl font-bold text-gray-800">{number}</p>
          </div>
        </div>
        {/* Antrean Kamu */}
        <div className="rounded-lg shadow-lg bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4">
            <p className="text-xl sm:text-2xl text-white font-semibold">
              Antrean Kamu
            </p>
          </div>
          <div className="flex flex-col items-center p-6">
            <p className="text-6xl font-bold text-gray-800">
              {latestBooking.queueNumber || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenBoard;
