import PolyListTable from "@/components/table/superadmin/PolyclinicListTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { getAllPolyclinics } from "@/data/polyclinics";
import { failedToast } from "@/lib/toaster";
import { useRefreshSchedules } from "@/store/store";
import { jwtDecode } from "jwt-decode";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PolyclinicPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [role, setRole] = useState("");
    const [polyList, setPoly] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [hasNext, setHasNext] = useState(true)
    const refresh = useRefreshSchedules((state) => state.refresh)
    const page = parseInt(searchParams.get("page")) || 1

    useEffect(() => {
        const fetchAllPoly = async () => {
            const token = sessionStorage.getItem("token")
            if (!token) return
            try {
                const { role } = jwtDecode(token)
                setRole(role)
                const response = await getAllPolyclinics({
                    page: page,
                    limit: 10,
                })
                setPoly(response)
                setHasNext(response.length === 10)
            } catch (error) {
                failedToast(error.message)
            }
        }
        fetchAllPoly()
    }, [page, refresh])

    const filterPoly = polyList.filter((poly) => {
        const search = searchTerm.toLowerCase();
        return (
            poly.polyclinicName.toLowerCase().includes(search) ||
            poly.descriptions.toLowerCase().includes(search)

        );
    });

    const changePage = (newPage) => {
        setSearchParams({ page: newPage.toString() })
    }

    return (
        <div className="w-full py-36">
            <div className="max-w-6xl mx-auto flex flex-col gap-[4rem]">
                <section className="flex w-full justify-between items-end">
                    <h3 className="text-4xl font-bold text-black mb-1">
                        #Halaman Poliklinik
                    </h3>
                    <img src="/klinigma.png" alt="Klinigma" width={120} />
                </section>
                <section className="flex justify-center items-center gap-2 w-full">
                    <div className="relative w-full">
                        <Input
                            placeholder="Cari Nama Poliklinik atau deskripsinya"
                            className="ps-7 pe-16 peer"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="transition-all absolute z-10 right-4 bottom-[10px] peer-hover:bottom-[7.1px] peer-hover:right-[9.5px] peer-focus-visible:bottom-[7.5px] peer-focus-visible:right-[10px]" />
                    </div>
                    {role == "superadmin" && <Button>Tambah Poliklinik <Plus size={20} /></Button>}
                </section>
                <section>
                    <PolyListTable polyList={filterPoly} />
                </section>
                <section className="flex justify-end gap-2">
                    <Button disabled={page === 1} onClick={() => changePage(page - 1)}>Sebelum</Button>
                    <Button disabled={!hasNext} onClick={() => changePage(page + 1)}>Berikutnya</Button>
                </section>
            </div>
        </div>
    )
}

export default PolyclinicPage