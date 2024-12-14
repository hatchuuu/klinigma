import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

export const TableComponent = ({ data }) => {

    const renderRow = () => {
        return data.map((value) => {
            const { id, name, gender } = value;
            return (
                <TableRow key={id}>
                    <TableCell className="font-medium">{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell className="text-right">{gender}</TableCell>
                    <TableCell className="flex justify-center items-start">
                        <ChevronDown size={15} />
                    </TableCell>
                </TableRow>
            );
        });
    };

    return (
        <div className="border shadow-lg rounded-lg px-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-20">ID</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead className="text-right">Gender</TableHead>
                        <TableHead className="text-center">Detail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        renderRow()
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
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
