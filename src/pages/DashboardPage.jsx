import CarouselBlock from "@/components/CarouselBlock"
import { Button } from "@/components/ui/button"
import { Bell, MapPin } from "lucide-react"
import { Link } from 'react-router-dom'

const DashboardPage = () => {
    return (
        <div className="mx-auto">
            <section className=" flex justify-around items-center py-4 ">
                <div className="flex gap-3">
                    <div className="rounded-full w-11 h-11 border-2 border-black" />
                    <div>
                        <p className="font-semibold">RYAN KUSUMA</p>
                        <p className="text-xs">Laki Laki, 25 tahun</p>
                    </div>
                </div>
                <Button variant="secondary" size="rounded">
                    <Bell />
                </Button>
            </section>

            <section className="mb-5">
                <div className="w-full px-7">
                    <input type="text" placeholder="Search Anything" className="w-full p-2 rounded-lg border-2 shadow text-xs" />
                </div>
            </section>

            <section className="mb-5">
                <div className="grid grid-cols-2 place-items-center px-7 gap-x-2 gap-y-3 text-sm ">
                    <div className="w-full col-span-2 flex justify-between items-center">
                        <div className="flex items-end gap-1">
                            <MapPin size={15} />
                            <p>Poli Paru-Paru</p>
                        </div>
                        <Button variant="link" className=" rounded-lg">Show All Ticket</Button>
                    </div>
                    <div className="w-full h-28 justify-end flex flex-col items-center pb-2 rounded-lg bg-purple-200">
                        <p className="text-4xl font-semibold mb-4">003</p>
                        <p>Antrean Saat ini</p>
                    </div>
                    <div className="bg-purple-400 w-full h-28 justify-end flex flex-col items-center pb-2 rounded-lg">
                        <p className="text-4xl font-semibold mb-4">021</p>
                        <p>Antrean Anda</p>
                    </div>
                </div>
            </section>

            <section className=" mb-3 rounded-lg px-6">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-end gap-1">
                        <h1 className="font-semibold text-lg tracking-wider my-2 ms-2">Polyclinic</h1>
                    </div>
                    <Link to={"/polyclinic-items"}>
                        <Button variant="link" className=" rounded-lg">Show All</Button>
                    </Link>
                </div>
                <CarouselBlock size={40} />
            </section>

            <section className=" mb-3 rounded-lg px-6">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-end gap-1">
                        <h1 className="font-semibold text-lg tracking-wider my-2 ms-2">Doctors</h1>
                    </div>
                    <Button variant="link" className=" rounded-lg">View All</Button>
                </div>
                <CarouselBlock size={44} />
            </section>
        </div>
    )
}

export default DashboardPage