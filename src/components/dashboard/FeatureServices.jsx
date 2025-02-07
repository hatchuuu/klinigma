import { featureServiceArray } from '@/utils/arrayDashboard'
import { CalendarDays } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FeatureServices = ({ handleScroll, role }) => {
    return (
        <section className="w-full flex flex-col gap-3">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Fitur Layanan
                </h2>
                <p className="text-gray-500">
                    Fitur yang dapat membantu anda dalam masalah kesehatan anda
                </p>
            </div>
            <div className="w-full flex justify-center gap-10">
                <Link
                    to={role === 'user' ? '/pendaftaran' : '/admin/antrean/panggilan'}
                    className="group neo-button py-16 neo-button-hover w-full flex flex-col items-center gap-5 justify-center hover:bg-neon hover:border-gray-800 hover:border-2"
                >
                    <CalendarDays size={42} className="text-gray-700 group-hover:text-white" />
                    <p className="group-hover:text-white text-xl font-semibold text-center text-gray-800">
                        {role === 'user' ? 'PENDAFTARAN ONLINE' : 'ATUR ANTREAN'}
                    </p>
                </Link>
                {
                    featureServiceArray.map((item, i) => {
                        return (
                            <button key={i} onClick={() => handleScroll(item.handleText)}
                                className="group neo-button py-16 neo-button-hover w-full flex flex-col items-center gap-5 justify-center hover:bg-neon hover:border-gray-800 hover:border-2"
                            >
                                <item.icon size={42} className="text-gray-700 group-hover:text-white" />
                                <p className="group-hover:text-white text-xl font-semibold text-center text-gray-800">
                                    {item.label}
                                </p>
                            </button>)
                    })
                }
            </div>
        </section>
    )
}

export default FeatureServices