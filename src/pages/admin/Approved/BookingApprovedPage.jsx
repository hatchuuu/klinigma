import { BackButton } from '@/components/button/NavigationButton'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
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

    const totalPages = Math.ceil(booking.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBooking = booking.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleFilterByPoly = (value) => {
        setPoly(value)
    }
    const handleFilterByDoctor = (value) => {
        setDoctor(value)
    }
    const handleApprove = async (id, message) => {
        try {
            const response = await updateBooking(id, message, true)
            successToast(response.message)
            setApprove(prev => !prev)
        } catch (error) {
            failedToast(error.message)
        }
    }
    return (

        <div className="max-w-7xl mx-auto sm:pt-32 pt-28 flex flex-col sm:flex-row justify-center gap-10 px-10">
            <section className="w-full sm:w-1/3">
                <div className="flex flex-col gap-5">
                    <BackButton path={"/dashboard"} />
                    <h1 className="text-3xl font-semibold text-center mb-10">PERSETUJUAN ANTREAN</h1>
                </div>
                <div className="mb-6">
                    <Label>Pilih Poliklinik</Label>
                    <Select onValueChange={handleFilterByPoly} className="w-full">
                        <SelectTrigger className="w-full sm:w-[280px]">
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
                </div>
                <div>
                    <Label className="mb-2">Pilih Dokter</Label>
                    <Select onValueChange={handleFilterByDoctor} className="w-full">
                        <SelectTrigger className="w-full sm:w-[280px]">
                            <SelectValue placeholder="Pilih Dokter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {listDoctors?.map((value, i) => (
                                    <SelectItem key={i} value={value.id}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </section>

            <section className="w-full">
                <div className="w-full overflow-auto shadow-md rounded-lg bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Booking ID</TableHead>
                                <TableHead>Nomor Antrean</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead className="text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedBooking.length > 0 ? (
                                paginatedBooking.map((value, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{value.id}</TableCell>
                                        <TableCell>{value.queueNumber}</TableCell>
                                        <TableCell>{value.name}</TableCell>
                                        <TableCell className="flex items-center justify-center gap-2">
                                            <Button onClick={() => handleApprove(value.id, "Approved")}>Setujui</Button>
                                            <Button onClick={() => handleApprove(value.id, "Canceled")}>Batalkan</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        Tidak Ada Data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex flex-wrap justify-center space-x-2 mt-10">
                    <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    {Array.from({ length: totalPages }).map((_, pageNumber) => (
                        <Button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber + 1)}
                            className={currentPage === pageNumber + 1 ? "underline font-bold" : ""}
                        >
                            {pageNumber + 1}
                        </Button>
                    ))}
                    <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </div>
            </section>
        </div>

    )
}

export default BookingApprovedPage