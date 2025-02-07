import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const doctor = [
    {
        "id": 1,
        "name": "dr. Andi",
        "image": "https://randomuser.me/api/portraits/men/73.jpg",
        "polycllinicName": "Kesehatan Ibu dan Anak",
    },
    {
        "id": 2,
        "name": "dr. Andriana",
        "image": "https://randomuser.me/api/portraits/men/73.jpg",
        "polycllinicName": "Kesehatan Ibu dan Anak",
    },
    {
        "id": 3,
        "name": "dr. Andriana",
        "image": "https://randomuser.me/api/portraits/men/73.jpg",
        "polycllinicName": "Kesehatan Ibu dan Anak",
    },
]

const ListDoctor = () => {
    return (
        <section className="w-full p-16 rounded-2xl bg-main flex flex-col justify-center items-center gap-12">
            <div>
                <h2 className="text-4xl font-bold text-center mb-2">
                    Dokter Kami
                </h2>
                <p className="text-gray-600 font-semibold text-center">
                    Dokter yang berpengalaman untuk menangani semua keluhan kesehatan anda
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {doctor.map((member, i) => (
                    <div
                        key={i}
                        className="bg-white p-8 neo-button neo-hover rounded-2xl text-center w-full"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-36 aspect-square mx-auto rounded-full border-2 border-neon mb-4"
                        />
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <h3 className="text-base font-base text-gray-400">{member.polycllinicName}</h3>
                    </div>
                ))}
            </div>

            <div className="flex justify-center" id="fasilitas-pelayanan">
                <Link to="/doctorsList">
                    <Button className="text-neon hover:bg-neon bg-main hover:text-white trasition-all bg-white">
                        <p>Lihat Semuanya</p>
                        <ChevronRight />
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export default ListDoctor