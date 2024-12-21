import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllDataBooking, updateBooking } from '@/data/bookings';
import { getDataPolyById, updateQueuePoly } from '@/data/poly';
import { Ban, Check, Minus, Plus } from 'lucide-react';
import { BackButton } from '@/components/button/NavigationButton';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import dayjs from 'dayjs';
import { getDoctorById, getDoctorsByPoly } from '@/data/doctors';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Label } from '@/components/ui/label';
import { failedToast, successToast } from '@/lib/toaster';
import 'dayjs/locale/id';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { compareTime } from '@/data/service';
import { Separator } from '@/components/ui/separator';


dayjs.locale('id');

const HandlerPage = () => {

    const socket = io(import.meta.env.VITE_SOCKET_URL);
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token")
    const [number, setNumber] = useState(0);
    const [polyId, setPolyId] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [booking, setBooking] = useState([])
    const [lateBooking, setLateBooking] = useState([])
    const [allBooking, setAllBooking] = useState([])
    const [polyName, setPolyName] = useState("")
    const [doctorId, setDoctorId] = useState(null)
    const [change, setChange] = useState(false)
    const [inputValue, setInputValue] = useState(null)
    const [inputTime, setInputTime] = useState(15)
    const [listDoctors, setListDoctors] = useState([])

    useEffect(() => {
        const fetchDataBookings = async () => {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const [role, prePolyId] = decodedToken.role.split("-");
                    setPolyId(prePolyId);
                    const { data: bookingData } = await getAllDataBooking()

                    // Validasi telat atau tidak
                    let openOn;
                    if (doctorId !== null) {
                        const { data: docData } = await getDoctorById(doctorId)
                        const hari = dayjs().format('dddd')
                        const findSchedulesHour = docData.schedules.find((value) => value.day == hari)
                        openOn = findSchedulesHour.open
                    }
                    dayjs.extend(isSameOrBefore);

                    const filterBookingsByPoly = bookingData.filter((value) => {
                        const limitTimeBooking = compareTime(value.updatedAt, openOn, inputTime)
                        return value.polyclinicId === Number(prePolyId)
                            && value.status === "Approved"
                            && value.bookingDate == dayjs().format('YYYY-MM-DD')
                            && value.doctorId == doctorId
                            && limitTimeBooking
                    })
                    const filterLateBookingsByPoly = bookingData.filter((value) => {
                        const limitTimeBooking = compareTime(value.updatedAt, openOn, inputTime)
                        return value.polyclinicId === Number(prePolyId)
                            && value.status === "Approved"
                            && value.bookingDate == dayjs().format('YYYY-MM-DD')
                            && value.doctorId == doctorId
                            && !limitTimeBooking
                    })
                    const allBookingsByPoly = bookingData.filter((value) => {
                        return value.polyclinicId === Number(prePolyId)
                            && value.status === "Approved"
                            && value.bookingDate == dayjs().format('YYYY-MM-DD')
                            && value.doctorId == doctorId
                    })
                    setBooking(filterBookingsByPoly)
                    setLateBooking(filterLateBookingsByPoly)
                    setAllBooking(allBookingsByPoly)

                    const { data: doctorsResp } = await getDoctorsByPoly(prePolyId)
                    setListDoctors(doctorsResp)
                    const { data: polyData } = await getDataPolyById(prePolyId)
                    setPolyName(polyData.polyclinicName)
                    setNumber(polyData.currentQueue)

                    if (role !== "admin") {
                        navigate("/dashboard");
                    } else {
                        socket.connect()
                    }
                } catch (err) {
                    console.error("Pesan Error:", err);
                }
            } else {
                sessionStorage.removeItem("token");
                navigate("/login");
            }
        }
        fetchDataBookings()

        return () => {
            socket.disconnect();
        };
    }, [token, navigate, doctorId, change, inputTime]);

    //Validasi Socket udah connect atau belum
    useEffect(() => {
        if (socket.connected) {
            setIsConnected(true);
            socket.emit('joinRoom', polyId); // Join room berdasarkan polyId
        }

        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [polyId, socket]);

    // Select Dokter
    const handleFilterByDoctor = (value) => {
        setDoctorId(value)
    }
    //Tombol Selesai / Batal
    const updateQueue = async (message) => {
        try {
            console.log({ booking });
            console.log({ lateBooking });
            const findIdBooking = allBooking.find((value) => (
                value.queueNumber == Number(number)
            ))
            console.log({ findIdBooking });
            if (findIdBooking) {
                const { status: polyStatus } = await updateQueuePoly(polyId, number)
                const { status: bookingStatus } = await updateBooking(findIdBooking.id, message)
                if (polyStatus == 200 && bookingStatus == 200) {
                    successToast("Berhasil Memperbarui data!")
                    setChange(() => prev => !prev)
                }
                else { throw new Error("Gagal Memperbarui data") }
            } else { throw new Error("Nomor Antrean tidak ditemukan") }
        } catch (error) {
            failedToast(error.message)
        }
    }
    // Tombol Panggil
    const sendNumber = () => {
        if (number && !isNaN(number)) {
            socket.emit('updateQueue', { number, polyId });
            successToast(`Memanggil urutan ke-${number}`)
        } else {
            alert("Masukkan angka valid");
        }
    };
    //Handle Input Time
    const handleTime = () => {
        if (inputValue !== "" && !isNaN(inputValue)) {
            setInputTime(inputValue);
            successToast("Berhasil mengubah batas terlambat!");
        } else {
            failedToast("Input harus berupa angka dan tidak boleh kosong!");
        }
    };

    const renderTable = (array) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Antrean</TableHead>
                    <TableHead>Nama</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {array.length > 0 ? (array?.map((value, i) => (
                    <TableRow key={i} className="cursor-pointer" onClick={() => setNumber(Number(value.queueNumber))}>
                        <TableCell>{value.id}</TableCell>
                        <TableCell>{value.queueNumber}</TableCell>
                        <TableCell>{value.name}</TableCell>
                    </TableRow>
                )))
                    :
                    <TableRow className="hover:bg-transparent">
                        <TableCell>Tidak ada data</TableCell>
                    </TableRow>
                }
            </TableBody>
        </Table>
    )

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full pt-20 sm:pt-40  p-6">
            <section className="flex w-full">
                <BackButton path="/dashboard" />
            </section>

            {/* List Booking By Polyclinic */}
            <div className="flex justify-center items-start sm:gap-10 w-full sm:flex-row flex-col">
                <section className="bg-white rounded-lg shadow-xl p-8 flex flex-col gap-7 items-center justify-center w-full">
                    <div className='w-full flex sm:justify-between sm:flex-row sm:gap-10 gap-4  flex-col justify-center items-center'>
                        <div className="flex flex-col">
                            <Label className="mb-2">Pilih Dokter</Label>
                            <Select onValueChange={handleFilterByDoctor}>
                                <SelectTrigger className="w-[60vw] sm:w-[25vw]">
                                    <SelectValue placeholder="Pilih Dokter" />
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
                        </div>
                        <div className="flex flex-col">
                            <Label className="mb-2">Atur Batas Terlambat (Menit)</Label>
                            <div className="flex gap-2">
                                <Input type="number" className="max-w-40 p-2" placeholder="default (15)"
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <Button onClick={handleTime}> Ubah </Button>
                            </div>
                        </div>
                    </div>

                    {/* Tabel Tepat Waktu */}
                    <div className="flex gap-5 w-full sm:min-h-[270px] sm:flex-row flex-col justify-center items-center">
                        <div className="w-full overflow-auto">
                            <Label className="text-start mb-2">Tepat Waktu</Label>
                            {renderTable(booking)}
                        </div>
                        <Separator orientation="vertical" className="sm:block hidden min-h-[270px]" />
                        {/* Tabel Telat Waktu */}
                        <div className="w-full overflow-auto">
                            <Label className="text-start mb-2">Terlambat Waktu</Label>
                            {renderTable(lateBooking)}
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-auto mt-20">
                    <h1 className="text-2xl font-semibold text-center text-primary/90">
                        KONTROL ANTREAN
                    </h1>
                    <h1 className="text-lg font-semibold text-center text-primary/50 mb-8">
                        {polyName}
                    </h1>
                    <div className="mb-10 flex items-center gap-4 justify-center">
                        <Input
                            id="number"
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(Number(e.target.value))}
                            placeholder="Masukkan angka"
                            className="w-2/3 mt-2 h-32 text-7xl md:text-8xl"
                        />
                        <div className="flex flex-col justify-center gap-2 h-full">
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setNumber(prev => prev + 1);
                                }}
                                className="w-full py-4"
                            >
                                <Plus size={15} />
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setNumber(prev => prev - 1);
                                }}
                                className="w-full py-4"
                            >
                                <Minus size={15} />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-5 items-center">
                        <Button
                            onClick={sendNumber}
                            className="w-full text-center py-4 "
                        >
                            Panggil
                        </Button>
                        <div className="flex justify-between w-full gap-5">
                            <Button
                                onClick={() => updateQueue("Canceled")}
                                className="bg-primary/80 w-full text-center py-5 "
                            >
                                <Ban size={15} />
                                Tolak
                            </Button>
                            <Button
                                onClick={() => updateQueue("Completed")}
                                className="bg-primary/80 w-full text-center py-5 "
                            >
                                <Check size={15} />
                                Selesai
                            </Button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-gray-600">
                        {isConnected ? "Tersambung ke server." : "Tidak tersambung ke server."}
                    </p>
                </section>
            </div>

        </div>
    );
};

export default HandlerPage;
