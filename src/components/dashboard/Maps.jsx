import { LocateIcon } from 'lucide-react'
import React from 'react'

const Maps = () => {

    const mapUrl = (import.meta.env.VITE_MAP_URL).toString()

    return (
        <footer className="bg-gray-100 py-8 px-4">
            <div className="flex flex-col items-center justify-center mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <LocateIcon />
                    <h1 className="text-center text-xl font-semibold text-gray-800">
                        Lokasi Klinik
                    </h1>
                </div>
                <p className="text-center text-sm text-gray-600">
                    Temukan lokasi klinik kami di peta berikut.
                </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 w-full md:w-2/3 lg:w-1/2 mx-auto">
                {/* Informasi kontak */}
                <div className="flex flex-col items-center md:items-start gap-4 text-sm text-gray-600">
                    <div>
                        <h2 className="font-semibold text-gray-800">Alamat:</h2>
                        <p>Jl. Sehat No.123, Jakarta</p>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800">
                            Nomor Telepon:
                        </h2>
                        <p>+62 21 1234 5678</p>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800">Email:</h2>
                        <p>info@klinigma.com</p>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800">
                            Jam Operasional:
                        </h2>
                        <p>Senin - Jumat: 08.00 - 17.00</p>
                        <p>Sabtu: 08.00 - 12.00</p>
                    </div>
                </div>
                {/* Peta lokasi */}
                <div className="w-full">
                    <iframe
                        src={mapUrl}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg shadow-md w-full h-64"
                    ></iframe>
                </div>
            </div>
            <div className="text-center text-sm text-gray-500 mt-6">
                &copy; {new Date().getFullYear()} Klinigma. Semua hak dilindungi.
            </div>
        </footer>
    )
}

export default Maps