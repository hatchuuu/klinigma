import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'

const DialogLogoutButton = ({ handleLogout }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="px-6 py-4"> Keluar <LogOut size={15} /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="py-8">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center font-bold text-2xl">
                        Anda ingin keluar?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center font-base text-gray-500 text-sm">
                        Anda akan diarahkan ke halaman login
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-center items-center py-7">
                    <img src="/logout.png" alt="Logout" width={150} />

                </div>
                <AlertDialogFooter className="flex justify-center items-center w-full gap-8 mt-3">
                    <AlertDialogAction onClick={handleLogout} className="w-32 bg-white">Keluar</AlertDialogAction>
                    <AlertDialogCancel className="w-32">Kembali</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogLogoutButton