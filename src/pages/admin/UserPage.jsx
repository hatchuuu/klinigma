import { TableComponent } from '@/components/table/TableComponent'
import { Button } from '@/components/ui/button'
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
    console.log(data);
    return (
        <>
            <Button onClick={() => navigate(-1)}><ChevronLeft size={20} /></Button>
            {
                data ?
                    <div className='p-6'>
                        <div>ListUser</div>
                        <TableComponent data={data} />
                    </div>
                    :
                    <p className='table-loader'></p>
            }
        </>
    )
}

export default UserPage