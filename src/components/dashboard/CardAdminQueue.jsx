import { getPolyclinicById } from "@/api/polyclinics"
import { failedToast } from "@/lib/toaster"
import { useAuthStore } from "@/store/store"
import { getFullDate } from "@/utils/dayjs"
import { useEffect, useState } from "react"

const CardAdminQueue = ({ data, poly }) => {
    const setPolyName = useAuthStore(state => state.setPolyName)
    const polyName = useAuthStore(state => state.polyName)

    useEffect(() => {
        const fetchPolyById = async () => {
            try {
                const response = await getPolyclinicById(poly)
                setPolyName(response.polyclinicName)
                sessionStorage.setItem("polyName", response.polyclinicName)
            } catch (error) {
                failedToast(error.message)
            }
        }
        fetchPolyById()
    }, [])

    return (
        <section className="w-full flex py-12 px-12 justify-between bg-neon rounded-2xl border-black border-2">
            <div className="flex flex-col gap-2 justify-center">
                <p className="text-3xl font-bold text-white">{polyName}</p>
                <p className="text-3xl font-bold text-white">{data?.doctor?.name}</p>
                <p className="text-lg font-bold text-white capitalize">{getFullDate(new Date())}</p>
                <div className="flex gap-5 mt-3">
                    <p className="text-lg font-bold text-black bg-main rounded-xl p-2">{data ? (data?.startTime + " s/d " + data?.endTime) : "Belum ada jadwal"}</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-6">
                <div className="w-64 aspect-square bg-white  rounded-xl flex justify-center items-center relative">
                    <p className="text-6xl font-bold text-black">3</p>
                    <p className="text-xl font-bold text-gray-800 absolute bottom-3">Antrean Saat ini</p>
                </div>
            </div>
        </section>
    )
}

export default CardAdminQueue