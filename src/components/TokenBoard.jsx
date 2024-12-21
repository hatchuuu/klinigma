import React from 'react';
import { formatDate } from '@/data/service'; // Import formatDate
import { Link } from 'react-router-dom';
import SideBarListQueue from '@/components/SideBarListQueue';

const TokenBoard = ({ latestBooking }) => {
  return (
    <section>
      <div className="grid grid-cols-2 gap-4 px-5"> 
        <div className="py-10 rounded-lg bg-primary hover:shadow-xl shadow w-full flex flex-col justify-center items-center">
          <p className="text-lg text-white semibold">
            Jam Mulai {formatDate(latestBooking.createdAt).fullDate},{" "} 
            {formatDate(latestBooking.createdAt).time}
          </p>
          <p className="text-2xl text-white semibold">
            Antrean Kamu {latestBooking.queueNumber} 
          </p>
        </div>
        <div className="py-10 rounded-lg bg-primary hover:shadow-xl shadow w-full flex flex-col justify-center items-center">
          <p className="text-lg text-white semibold">
            Antrean Sekarang
          </p>
          <p className="text-2xl text-white semibold">
            {latestBooking.polyQueue} 
          </p>
        </div>
      </div>
    </section>
  );
};

export default TokenBoard;