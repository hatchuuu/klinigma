import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronDown } from "lucide-react"
import PropTypes from "prop-types"

export const TableComponent = ({ data }) => {

    const renderRow = () => {
        return data.map((value) => {
            const { id, name, gender } = value
            return (
                <TableRow key={id}>
                    <TableCell className="font-medium">{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell className="text-right">{gender}</TableCell>
                    <TableCell className="flex justify-center items-start">
                        <ChevronDown size={15} />
                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <Table>
            <TableCaption>Tabel User</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-20">ID</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead className="text-right">Gender</TableHead>
                    <TableHead className="text-right">Detail</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {renderRow()}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">{data.length} user</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

TableComponent.propTypes = {
    data: PropTypes.object
}