import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { createQueueByUser } from '@/data/queue';
import { failedToast } from '@/lib/toaster';
import { useNotif } from '@/store/store';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DialogQueueButton = ({ day, children, doctor, selectDay }) => {
    const addNotif = useNotif((state) => state.addNotif)
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const createQueue = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token")
        try {
            setIsLoading(true)
            if (!token) return;
            const { id } = jwtDecode(token)
            const data = {
                userId: id,
                doctorId: doctor.id,
                date: day.dateISO
            }
            await createQueueByUser(data);
            addNotif({
                title: "Berhasil Menambah Antrean",
                message: "Antrean anda telah berhasil ditambahkan. Silahkan segera ke poliklinik"
            })
            navigate(`/pendaftaran/jadwal/detail`, {
                state: { isSuccess: true, doctorId: doctor.id }
            })
        } catch (error) {
            failedToast(error.message)
        } finally {
            setIsLoading(false)
            setIsOpen(false)
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="py-8">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center font-bold text-2xl">
                        Data Antrean
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center font-base text-gray-500 text-sm">
                        Pastikan data yang anda masukan sudah benar
                    </AlertDialogDescription >
                    <div className="flex justify-center items-center py-7">
                        <div className="grid grid-cols-2 gap-8">
                            <p>Hari</p><p className='capitalize'>{day.day}, {day.date}</p>
                            <p>Poliklinik</p><p>{doctor.polyclinicName}</p>
                            <p>Nama Dokter</p><p>{doctor.name}</p>
                            <p>Sisa Kuota</p><p>{selectDay.quota}</p>
                            <p>Pukul</p><p>{selectDay.startTime} s/d {selectDay.endTime}</p>
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center items-center w-full gap-8 mt-3">
                    <AlertDialogCancel className="w-32 bg-white">Kembali</AlertDialogCancel>
                    <AlertDialogAction onClick={createQueue} disabled={isLoading} className="w-32">Simpan</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogQueueButton