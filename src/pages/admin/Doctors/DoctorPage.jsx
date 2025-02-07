import DoctorListTable from "@/components/table/admin/DoctorListTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { getAllDoctors } from "@/data/doctors";
import { failedToast } from "@/lib/toaster";
import { useRefreshSchedules } from "@/store/store";
import { jwtDecode } from "jwt-decode";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const AdminQueuePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [doctorList, setDoctorList] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [hasNext, setHasNext] = useState(true)
    const refresh = useRefreshSchedules((state) => state.refresh)
    const page = parseInt(searchParams.get("page")) || 1

    useEffect(() => {
        const fetchDoctorsByPoly = async () => {
            const token = sessionStorage.getItem("token")
            if (!token) return
            try {
                const { polyId } = jwtDecode(token)
                const response = await getAllDoctors({
                    polyclinicId: polyId,
                    page: page,
                    limit: 10,
                })
                setDoctorList(response)
                setHasNext(response.length === 10)
            } catch (error) {
                failedToast(error.message)
            }
        }
        fetchDoctorsByPoly()
    }, [page, refresh])

    const filterDoctors = doctorList.filter((doctor) => {
        const search = searchTerm.toLowerCase();
        return (
            doctor.name.toLowerCase().includes(search) ||
            doctor.email.toLowerCase().includes(search)
        );
    });

    console.log({ doctorList })

    const changePage = (newPage) => {
        setSearchParams({ page: newPage.toString() })
    }

    return (
        <div className="w-full py-36">
            <div className="max-w-6xl mx-auto flex flex-col gap-[3rem]">
                <section className="flex w-full justify-between items-end">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-4xl font-bold text-black mb-1">
                            #Halaman Dokter
                        </h3>
                        <h3 className="text-2xl font-bold text-gray-400">
                            / {doctorList[0]?.polyclinicName}
                        </h3>
                    </div>
                    <img src="/klinigma.png" alt="Klinigma" width={120} />
                </section>
                <section className="relative mt-10">
                    <Input
                        placeholder="Cari Nama User, nomor, dan email"
                        className="ps-7 peer"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="transition-all absolute z-10 right-4 bottom-[10px] peer-hover:bottom-[7.1px] peer-hover:right-[9.5px] peer-focus-visible:bottom-[7.5px] peer-focus-visible:right-[10px]" />
                </section>
                <section>
                    <DoctorListTable doctorList={filterDoctors} />
                </section>
                <section className="flex justify-end gap-2">
                    <Button disabled={page === 1} onClick={() => changePage(page - 1)}>Sebelum</Button>
                    <Button disabled={!hasNext} onClick={() => changePage(page + 1)}>Berikutnya</Button>
                </section>
            </div>
        </div>
    )
}

export default AdminQueuePage