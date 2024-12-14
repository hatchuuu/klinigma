import { Button } from '@/components/ui/button'
import { CompassIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='flex w-full justify-center items-center min-h-screen flex-col gap-3'>
            <CompassIcon size={52} color='black' />
            <p className='font-bold text-2xl'>TIDAK ADA APAPUN DISINI</p>
            <Button variant="outline" onClick={() => navigate(-1)}>Kembali</Button>
        </div>
    )
}

export default NotFound