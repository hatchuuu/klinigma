import DoctorListTable from "@/components/table/DoctorListTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { getAllDoctors } from "@/api/doctors";
import { failedToast } from "@/lib/toaster";
import { useAuthStore, useRefreshSchedules } from "@/store/store";
import { jwtDecode } from "jwt-decode";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DoctorPage = () => {
    const [role, setRole] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [doctorList, setDoctorList] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [hasNext, setHasNext] = useState(false)
    const refresh = useRefreshSchedules((state) => state.refresh)
    const page = parseInt(searchParams.get("page")) || 1
    const polyName = useAuthStore(state => state.polyName)

    useEffect(() => {
        const fetchDoctorsByPoly = async () => {
            const token = sessionStorage.getItem("token")
            if (!token) return
            try {
                const { polyId, role } = jwtDecode(token)
                setRole(role)
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
            doctor.email.toLowerCase().includes(search) ||
            doctor.polyclinicName.toLowerCase().includes(search)
        );
    });

    const changePage = (newPage) => {
        setSearchParams({ page: newPage.toString() })
    }

    return (
        <div className="w-full py-40">
            <div className="max-w-6xl mx-auto flex flex-col gap-[4rem]">
                <section className="flex w-full justify-between items-end">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-4xl font-bold text-black mb-1">
                            #Halaman Dokter
                        </h3>
                        {role == "admin" && <h3 className="text-2xl font-bold text-gray-400">/ {polyName}</h3>}
                    </div>
                    <img src="/klinigma.png" alt="Klinigma" width={120} />
                </section>
                <section className="flex justify-center items-center gap-2 w-full">
                    <div className="relative w-full">
                        <Input
                            placeholder="Cari Nama Dokter, Poliklinik, atau Email"
                            className="ps-7 pe-16 peer"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="transition-all absolute z-10 right-4 bottom-[10px] peer-hover:bottom-[7.1px] peer-hover:right-[9.5px] peer-focus-visible:bottom-[7.5px] peer-focus-visible:right-[10px]" />
                    </div>
                    {role == "superadmin" && <Button>Tambah Dokter <Plus size={20} /></Button>}
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

export default DoctorPage