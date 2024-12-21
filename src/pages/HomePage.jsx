import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <>
            <div className="flex justify-between items-center p-5 mx-0 md:mx-14">
                <img src="/klinigma.png" alt="Logo Klinigma" className="w-28 md:w-36" />
                <Link to={"/login"}>
                    <h1 className="text-base text-purple-950">Mulai Sekarang</h1>
                </Link>
            </div>
            <div className="flex flex-col-reverse md:flex-row p-6 md:p-10 mx-0 md:mx-24 justify-center items-center">
                <div className="flex flex-col md:w-1/2">
                    <h1 className="w-auto text-center md:text-start md:w-2/3 text-xl md:text-4xl text-bold mb-5">Booking Klinik<span className="text-purple-950"> Mudah</span> dan <span className="text-purple-950">Cepat</span></h1>
                    <p className="w-auto text-center md:text-start md:w-3/4 mb-5">Klinigma adalah solusi modern untuk booking klinik online. Nikmati kemudahan memilih jadwal, dokter, dan layanan kesehatan yang Anda butuhkan, kapan saja dan di mana saja.</p>
                    <Link to={"/login"} asChild>
                        <Button className="w-full md:w-32 rounded-full">
                            Mulai Sekarang
                        </Button>
                    </Link>
                </div>
                <div className="flex w-4/5 md:w-1/2 justify-center items-center">
                    <img src="/home.svg" alt="" className="w-80" />
                </div>
            </div>
        </>
    )
}

export default HomePage