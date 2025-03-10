import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getDayByQueue, getTableDate } from "@/utils/dayjs";
import { EllipsisVertical } from "lucide-react";
import PropTypes from "prop-types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { failedToast, successToast } from "@/lib/toaster";
import { updateQueueById } from "@/api/queue";
import { useNotif } from "@/store/store";

export const TableComponent = ({ data, refreshPage }) => {
    const addNotif = useNotif((state) => state.addNotif)

    const renderRow = () => {
        return data.map((value, i) => {
            const { id, date, polyclinic: { polyclinicName }, doctor: { name: doctorName, id: doctorId }, queueNumber, status, time } = value;

            let newStatus = "";
            switch (status) {
                case "waiting":
                    newStatus = "Menunggu"
                    break;
                case "progress":
                    newStatus = "Mengantri"
                    break;
                case "done":
                    newStatus = "Selesai"
                    break;
                case "cancel":
                    newStatus = "Dibatalkan"
                    break;
                default:
                    break;
            }

            const menuDropdown = (id) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="ms-6 p-2 rounded-md hover:bg-gray-200 font-bold w-fit">
                                <EllipsisVertical size={15} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-20">
                            <DropdownMenuItem>
                                <button className="w-full text-left" onClick={() => handleCancel(id)}>Batalkan</button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }

            const handleCancel = async (id) => {
                try {
                    if (status === "cancel") throw new Error("Antrean sudah dibatalkan")
                    await updateQueueById(id, { status: "cancel", doctorId, date });
                    successToast("Berhasil Membatalkan antrean");
                    refreshPage(prev => !prev);
                    addNotif({
                        title: "Pembatalan Antrean Berhasil",
                        message: `Antrean anda dengan id ${id} telah berhasil dibatalkan`
                    })
                }
                catch (error) {
                    failedToast(error.message);
                }
            }

            return (
                <TableRow key={i} className="h-20">
                    <TableCell className="min-w-20 text-center">{i + 1}</TableCell>
                    <TableCell className="min-w-20  flex justify-center mt-3">
                        <h1 className="bg-yellow-300 p-2 rounded-lg font-bold border shadow w-fit">
                            {newStatus}
                        </h1>
                    </TableCell>
                    <TableCell className="min-w-20 text-center">{time}</TableCell>
                    <TableCell className="min-w-20 text-left">{polyclinicName}</TableCell>
                    <TableCell className="min-w-20 text-left">{doctorName}</TableCell>
                    <TableCell className="min-w-20 text-center">{queueNumber}</TableCell>
                    <TableCell className="min-w-20  flex justify-center">
                        <p className="p-3 rounded-lg font-bold border shadow m-2 w-fit">
                            {getTableDate(date)}
                        </p>
                    </TableCell>
                    <TableCell>
                        {menuDropdown(id)}
                    </TableCell>
                </TableRow>
            );
        });
    };

    return (
        <div >
            <Table>
                <TableHeader className="text-lg uppercase bg-neon h-16" >
                    <TableRow >
                        <TableHead className="min-w-20 text-center">No.</TableHead>
                        <TableHead className="min-w-20 text-center">Status</TableHead>
                        <TableHead className="min-w-20 text-center">Pukul</TableHead>
                        <TableHead className="min-w-20 text-left">Poliklinik</TableHead>
                        <TableHead className="min-w-20 text-left">Dokter</TableHead>
                        <TableHead className="min-w-20 text-center">Antrean</TableHead>
                        <TableHead className="min-w-20 text-center">Tanggal</TableHead>
                        <TableHead className="min-w-20 text-center">Detail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-base">
                    {data.length > 0 ? (
                        renderRow()
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                Data Tidak Ditemukan
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

TableComponent.propTypes = {
    data: PropTypes.array.isRequired
};
