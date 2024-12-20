import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllDataBooking, updateBooking } from '@/data/bookings'
import { getDoctorsByPoly } from '@/data/doctors'
import { failedToast, successToast } from '@/lib/toaster'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const BookingApprovedPage = () => {
    const [booking, setBooking] = useState([])
    const [doctor, setDoctor] = useState("")
    const [poly, setPoly] = useState("")
    const [approve, setApprove] = useState(false)
    const [listDoctors, setListDoctors] = useState([])
    useEffect(() => {
        const fetchDataBooking = async () => {
            const { data: bookingResp } = await getAllDataBooking()
            const filteredBooking = bookingResp?.filter((value) => {
                return value.bookingDate == dayjs().format('YYYY-MM-DD')
                    && value.status == "Waiting"
                    && value.polyclinicId == poly
                    && value.doctorId == doctor
            })

            const { data: doctorsResp } = await getDoctorsByPoly(poly)
            setListDoctors(doctorsResp)
            setBooking(filteredBooking)
        }
        fetchDataBooking()
    }, [doctor, poly, approve])

    const handleFilterByPoly = (value) => {
        setPoly(value)
    }
    const handleFilterByDoctor = (value) => {
        setDoctor(value)
    }
    const handleApprove = async (id) => {
        try {
            const response = await updateBooking(id, "Approved", true)
            successToast(response.message)
            setApprove(prev => !prev)
        } catch (error) {
            failedToast(error.message)
        }
    }
    return (
        <div>
            <Select onValueChange={handleFilterByPoly}>
                <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Pilih Poliklinik" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="1">Poli Umum</SelectItem>
                        <SelectItem value="2">Poli Gigi</SelectItem>
                        <SelectItem value="3">Kesehatan Ibu dan Anak (KIA)</SelectItem>
                        <SelectItem value="4">Poli Keluarga Berencana (KB)</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={handleFilterByDoctor}>
                <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Pilih Poliklinik" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            listDoctors?.map((value, i) => (
                                <SelectItem key={i} value={value.id}>{value.name}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>

            <div className="w-full overflow-auto shadow-md rounded-lg bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Nomor Antrean</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {booking?.map((value, i) => (
                            <TableRow key={i}>
                                <TableCell>{value.id}</TableCell>
                                <TableCell>{value.queueNumber}</TableCell>
                                <TableCell>{value.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleApprove(value.id)}>Setujui</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default BookingApprovedPage