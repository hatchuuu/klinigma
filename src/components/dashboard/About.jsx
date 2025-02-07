import React from 'react'

const About = () => {
    return (
        <section className="flex flex-row items-start py-12 bg-gray-50">
            <div className="w-1/2 text-center lg:text-left">
                <h2 className="text-xl font-semibold text-neon">
                    TENTANG KAMI
                </h2>
                <h1 className="text-4xl font-bold text-gray-800 mt-4">
                    Komitmen dalam Pelayanan, Dedikasi dalam Kesehatan
                </h1>
                <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                    Klinigma kami didirikan dengan tujuan untuk memberikan
                    layanan kesehatan berkualitas tinggi dengan teknologi terkini
                    dan tenaga medis profesional. Dengan berbagai fasilitas modern,
                    kami berkomitmen untuk memenuhi kebutuhan kesehatan Anda dan
                    keluarga.
                </p>
                <p className="text-lg text-gray-600 mt-4 leading-relaxed" id="dokter-spesialis">
                    Kami percaya bahwa kesehatan adalah prioritas utama, dan kami
                    hadir untuk memastikan Anda mendapatkan perawatan terbaik, kapan
                    pun Anda membutuhkannya.
                </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
                <img
                    src="/picture-1.jpg"
                    alt="Rumah Sakit"
                    className="rounded-lg shadow-lg w-[200]"
                />
            </div>
        </section>
    )
}

export default About