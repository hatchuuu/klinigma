import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import SchedulesForm from "../form/SchedulesForm";

const ChangeSchedulesDialog = ({ children, data }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { name, schedules, id } = data
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="p-12 max-w-5xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center font-bold text-2xl">
                        Jadwal Dokter
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center font-base text-gray-500 text-sm">
                        {name}
                    </AlertDialogDescription>
                    <SchedulesForm data={schedules} doctorId={id} setIsOpen={setIsOpen} />
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center items-center w-full gap-8 mt-3">
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ChangeSchedulesDialog;
