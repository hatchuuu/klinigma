import UserListTable from "@/components/table/UserListTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { getAllUsers } from "@/data/users";
import { failedToast } from "@/lib/toaster";
import { useRefreshSchedules } from "@/store/store";
import { jwtDecode } from "jwt-decode";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const AdminQueuePage = () => {
  const [role, setRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [hasNext, setHasNext] = useState(true)
  const refresh = useRefreshSchedules((state) => state.refresh)
  const page = parseInt(searchParams.get("page")) || 1

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = sessionStorage.getItem("token")
      if (!token) return
      try {
        const { role } = jwtDecode(token)
        setRole(role)
        const response = await getAllUsers({
          page: page,
          limit: 10,
        })
        setUsers(response)
        setHasNext(response.length === 10)
      } catch (error) {
        failedToast(error.message)
      }
    }
    fetchAllUsers()
  }, [page, refresh])

  const filterUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  });

  const changePage = (newPage) => {
    setSearchParams({ page: newPage.toString() })
  }

  return (
    <div className="w-full py-36">
      <div className="max-w-6xl mx-auto flex flex-col gap-[4rem]">
        <section className="flex w-full justify-between items-end">
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl font-bold text-black mb-1">
              #Halaman User
            </h3>
          </div>
          <img src="/klinigma.png" alt="Klinigma" width={120} />
        </section>
        <section className="flex justify-center items-center gap-2 w-full">
          <div className="relative w-full">
            <Input
              placeholder="Cari Nama User, nomor, dan email"
              className="ps-7 pe-16 peer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="transition-all absolute z-10 right-4 bottom-[10px] peer-hover:bottom-[7.1px] peer-hover:right-[9.5px] peer-focus-visible:bottom-[7.5px] peer-focus-visible:right-[10px]" />
          </div>
          {role == "superadmin" && <Button>Tambah User <Plus size={20} /></Button>}
        </section>
        <section>
          <UserListTable userList={filterUsers} />
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