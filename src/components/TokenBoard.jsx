import React from 'react'

const TokenBoard = ({ data: latestBooking }) => {
    return (
        <section>
            <div className="grid grid-cols-4 gap-4 px-5">
                <p className="h-20 rounded-lg bg-primary text-white hover:shadow-xl shadow w-full"> Jam Mulai {formatDate(latestBooking.visitedAt).fullDate}, {formatDate(latestBooking.visitedAt).time}</p>
                <div className="py-10 rounded-lg bg-primary  hover:shadow-xl shadow w-3/4 flex justify-center items-center">
                    <p className="text-2xl text-white semibold">Antrean Kamu {latestBooking.polyQueue}</p>
                </div>
                <div className="py-10 rounded-lg bg-primary  hover:shadow-xl shadow w-3/4 flex justify-center items-center">
                    <p className="text-2xl text-white semibold">Antrean Sekarang{latestBooking.polyQueue}</p>
                </div>
                <Link to="/all-queue" className="h-20 rounded-lg bg-primary text-white hover:shadow-xl shadow w-full">
                    Lihat semua antrean yang akan datang
                </Link>
                <SideBarListQueue data={allBookings} />
            </div>
        </section>
    )
}

export default TokenBoard