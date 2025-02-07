import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getDate, getFullHourDate } from "@/utils/dayjs";
import ChangeSchedulesDialog from "@/components/dialog/ChangeSchedulesDialog";

const UserListTable = ({ userList }) => {

    const renderRow = () => {
        return userList.map((value, i) => {
            const { name, email, gender, birthDate, location, createdAt } = value;

            return (
                <TableRow key={i} className="h-20">
                    <TableCell className="min-w-10 text-center">{i + 1}</TableCell>
                    <TableCell className="min-w-20 text-center">
                        <p className="p-3 rounded-lg font-bold border bg-yellow-400 shadow inline-block">
                            {name}
                        </p>
                    </TableCell>
                    <TableCell className="min-w-20 text-center">{email}</TableCell>
                    <TableCell className="min-w-20 text-center">{gender}</TableCell>
                    <TableCell className="min-w-20 text-center">{getDate(birthDate)}</TableCell>
                    <TableCell className="min-w-20 text-center">{location}</TableCell>
                    <TableCell className="min-w-20 text-center">{getFullHourDate(createdAt)}</TableCell>
                    {/* <TableCell className="min-w-20 text-center">
                        <ChangeSchedulesDialog data={value}>
                            <button className="p-3 rounded-lg font-bold border bg-yellow-200 shadow inline-block">Ubah Jadwal</button>
                        </ChangeSchedulesDialog>
                    </TableCell> */}
                </TableRow>
            );
        });
    };

    return (
        <div >
            <Table>
                <TableHeader className="text-lg uppercase bg-neon h-16" >
                    <TableRow >
                        <TableHead className="min-w-10 text-center">No</TableHead>
                        <TableHead className="min-w-20 text-center">Nama</TableHead>
                        <TableHead className="min-w-20 text-center">Email</TableHead>
                        <TableHead className="min-w-20 text-center">Jenis Kelamin</TableHead>
                        <TableHead className="min-w-20 text-center">Tanggal Lahir</TableHead>
                        <TableHead className="min-w-20 text-center">Domisili</TableHead>
                        <TableHead className="min-w-20 text-center">Bergabung Pada</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="text-base">
                    {userList.length > 0 ? (
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

export default UserListTable
