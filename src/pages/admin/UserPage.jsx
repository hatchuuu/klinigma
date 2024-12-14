
import UserChart from '@/components/charts/UserCharts'
import { TableComponent } from '@/components/table/TableComponent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAllUsers } from '@/data/users'
import { failedToast } from '@/lib/toaster'
import { ChevronLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserPage = () => {

    const [data, setData] = useState()
    const fetchAllUsers = async () => {
        const response = await getAllUsers()
        if (response.status == 404) {
            failedToast(response.message)
        } else {
            setData(response.data)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const navigate = useNavigate()

    const [filterData, setFilterData] = useState("");

    const filteredInput = data?.filter((value) =>
        value.name.toLowerCase().includes(filterData.toLowerCase())
    );

    return (
        <div className='p-8 flex flex-col gap-4 mb-52'>
            <section className='flex gap-5 items-center'>
                <Button onClick={() => navigate(-1)}><ChevronLeft size={20} /></Button>
                <h1>DAFTAR USER</h1>
            </section>

            <section>
                <UserChart />
            </section>
            <section>
                <Input
                    className="h-10 w-full border border-gray-300 rounded-md px-3 mb-3"
                    value={filterData}
                    onChange={(e) => setFilterData(e.target.value)}
                    placeholder="Cari User"
                />

            </section>

            {
                data ?
                    <TableComponent data={filteredInput} />
                    :
                    <div className="flex justify-center items-center mt-3">
                        <p className='table-loader'></p>
                    </div>
            }
        </div>
    )
}

export default UserPage