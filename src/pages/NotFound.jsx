import { Button } from '@/components/ui/button'
import { ChevronLeft, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='flex w-full justify-center items-center min-h-screen flex-col gap-8'>
            <div className='flex justify-center items-center gap-2'>
                <p className='font-bold text-2xl'>Halaman Tidak Ditemukan</p>
                <Search size={18} />
            </div>
            <Button variant="noShadow" onClick={() => navigate(-1)}><ChevronLeft size={18} /> Kembali</Button>
        </div>
    )
}

export default NotFound