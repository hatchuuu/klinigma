import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { getFullHourDate, getTableDate } from "@/utils/dayjs";
import { EllipsisVertical } from "lucide-react";
import { failedToast, successToast } from "@/lib/toaster";
import { updateQueueById } from "@/data/queue";
import { useNotif } from "@/store/store";

const QueueListTable = ({ queueList, refreshPage }) => {
    const addNotif = useNotif((state) => state.addNotif)


    const renderRow = () => {
        return queueList.map((value, i) => {
            const { id, date, createdAt, updatedAt, doctor: { name: doctorName, id: doctorId }, queueNumber, status, user: { name: userName } } = value;

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
                    <TableCell className="min-w-10 text-center">{i + 1}</TableCell>
                    <TableCell className="min-w-20 text-center">
                        <p className="p-3 rounded-lg font-bold border shadow inline-block">
                            {getTableDate(date)}
                        </p>
                    </TableCell>

                    <TableCell className="min-w-20 text-center">
                        <p className="p-3 rounded-lg font-bold border shadow inline-block bg-yellow-300">
                            {newStatus}
                        </p>
                    </TableCell>
                    <TableCell className="min-w-20 text-center">{userName}</TableCell>
                    <TableCell className="min-w-20 text-center">{doctorName}</TableCell>
                    <TableCell className="min-w-20 text-center">{queueNumber}</TableCell>
                    <TableCell className="min-w-20 text-center">{getFullHourDate(createdAt)}</TableCell>
                    <TableCell className="min-w-20 text-center">{getFullHourDate(updatedAt)}</TableCell>
                    <TableCell className="min-w-20 text-center">
                        {menuDropdown(id)}
                    </TableCell>
                </TableRow>
            );
        });
    };

    return (
        <Table>
            <TableHeader className="text-lg uppercase bg-neon h-16" >
                <TableRow >
                    <TableHead className="min-w-10 text-center">No.</TableHead>
                    <TableHead className="min-w-20 text-center">Tanggal</TableHead>
                    <TableHead className="min-w-20 text-center">Status</TableHead>
                    <TableHead className="min-w-20 text-center">Nama</TableHead>
                    <TableHead className="min-w-20 text-center">Dokter</TableHead>
                    <TableHead className="min-w-20 text-center">Antrean</TableHead>
                    <TableHead className="min-w-20 text-center">Dibuat pada</TableHead>
                    <TableHead className="min-w-20 text-center">Terakhir diubah</TableHead>
                    <TableHead className="min-w-20 text-center">Detail</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody className="text-base">
                {queueList.length > 0 ? (
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
    );
};

export default QueueListTable
