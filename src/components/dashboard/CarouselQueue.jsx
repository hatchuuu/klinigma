import React from 'react'
import { Link } from 'react-router-dom'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { getFullDate } from '@/utils/dayjs'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
const CarouselQueue = ({ queue }) => {
    const navigate = useNavigate()
    return (
        <>
            {
                (queue?.length > 0) ?
                    <Carousel className="w-full">
                        <CarouselContent>
                            {queue?.map((d, i) => (
                                <CarouselItem key={i}>
                                    <section key={i} className="w-full flex py-12 px-12 justify-between bg-neon rounded-2xl border-black border-2">
                                        <div className="flex flex-col gap-2 justify-center">
                                            <p className="text-3xl font-bold text-white">{d?.polyclinic.polyclinicName}</p>
                                            <p className="text-3xl font-bold text-white">{d?.doctor.name}</p>
                                            <p className="text-lg font-bold text-white capitalize">{getFullDate(d?.date)}</p>
                                            <div className="flex gap-5 mt-3">
                                                <p className="text-lg font-bold text-black bg-main rounded-xl p-2">{d?.time} WIB</p>
                                            </div>
                                            <Link to="/antrean" className="text-lg font-bold text-white mt-16 hover:underline">Lihat Semua Antrean</Link>
                                        </div>
                                        <div className="flex justify-center items-center gap-6">
                                            <div className="w-64 aspect-square bg-main rounded-xl flex justify-center items-center relative">
                                                <p className="text-6xl font-bold text-black">{d?.queueNumber}</p>
                                                <p className="text-xl font-bold text-gray-800 absolute bottom-3">Antrean Anda</p>
                                            </div>
                                            <div className="w-64 aspect-square bg-white  rounded-xl flex justify-center items-center relative">
                                                <p className="text-6xl font-bold text-black">1</p>
                                                <p className="text-xl font-bold text-gray-800 absolute bottom-3">Antrean Saat ini</p>
                                            </div>
                                        </div>
                                    </section>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    :
                    <>
                        <div className='w-full flex flex-col py-12 items-center justify-around gap-5 bg-neon rounded-2xl border-black border-2'>
                            <img src="/logout.png" width={110} />
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <p className='text-2xl bold text-white'>Anda Belum memiliki antrean saat ini</p>
                                <Button onClick={() => navigate("/pendaftaran")}>Ambil antrean</Button>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}
export default CarouselQueue
