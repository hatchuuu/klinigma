import React from "react";
import { formatDate } from "@/data/service"; // Import formatDate
import { Link } from "react-router-dom";
import SideBarListQueue from "@/components/SideBarListQueue";

const TokenBoard = ({ latestBooking }) => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-[100] bg-white rounded-lg shadow-lg text-center">
          <div className="bg-purple-500 text-white font-medium py-3 rounded-t-lg">
          </div>
          <div class="p-6">
            <p className="text-2xl text-black semibold">Antrean Kamu</p>
            <div className="text-5xl text-black semibold">
              {latestBooking.queueNumber}
            </div>
          </div>
        </div>

        <div className="w-100 bg-white rounded-lg shadow-lg text-center">
          <div className="bg-purple-500 text-white font-medium py-3 rounded-t-lg">
          </div>

          <div class="p-6">
            <p className="text-2xl text-black semibold">Antrean Sekarang</p>
            <div className="text-5xl text-black semibold">
              {" "}
              {latestBooking.polyQueue}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default TokenBoard;
