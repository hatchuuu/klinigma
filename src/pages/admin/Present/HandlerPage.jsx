import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllDataBooking, updateBooking } from "@/data/bookings";
import { getDataPolyById, updateQueuePoly } from "@/data/poly";
import { Ban, Check, Minus, Plus } from "lucide-react";
import { BackButton } from "@/components/button/NavigationButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import { getDoctorById, getDoctorsByPoly } from "@/data/doctors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { failedToast, successToast } from "@/lib/toaster";
import "dayjs/locale/id";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { compareTime } from "@/data/service";
import { Separator } from "@/components/ui/separator";
import { getAllQueue } from "@/data/queue";

dayjs.locale("id");

const HandlerPage = () => {
  const socket = io(import.meta.env.VITE_SOCKET_URL);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [number, setNumber] = useState(0);
  const [polyId, setPolyId] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [booking, setBooking] = useState([]);
  const [lateBooking, setLateBooking] = useState([]);
  const [allBooking, setAllBooking] = useState([]);
  const [polyName, setPolyName] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const [change, setChange] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [inputTime, setInputTime] = useState(15);
  const [listDoctors, setListDoctors] = useState([]);

  useEffect(() => {
    const fetchDataBookings = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const [role, prePolyId] = decodedToken.role.split("-");
          setPolyId(prePolyId);
          const { data: bookingData } = await getAllDataBooking();

          // Validasi telat atau tidak
          let openOn;
          if (doctorId !== null) {
            const { data: docData } = await getDoctorById(doctorId);
            const hari = dayjs().format("dddd");
            const findSchedulesHour = docData.schedules.find(
              (value) => value.day == hari
            );
            if (findSchedulesHour) {
              openOn = findSchedulesHour.open;
            } else {
              failedToast("Dokter tidak memiliki jadwal hari ini");
            }
          }
          dayjs.extend(isSameOrBefore);

          const filterBookingsByPoly = bookingData.filter((value) => {
            const limitTimeBooking = compareTime(
              value.updatedAt,
              openOn,
              inputTime
            );
            return (
              value.polyclinicId === Number(prePolyId) &&
              value.status === "Approved" &&
              value.bookingDate == dayjs().format("YYYY-MM-DD") &&
              value.doctorId == doctorId &&
              limitTimeBooking
            );
          });
          const filterLateBookingsByPoly = bookingData.filter((value) => {
            const limitTimeBooking = compareTime(
              value.updatedAt,
              openOn,
              inputTime
            );
            return (
              value.polyclinicId === Number(prePolyId) &&
              value.status === "Approved" &&
              value.bookingDate == dayjs().format("YYYY-MM-DD") &&
              value.doctorId == doctorId &&
              !limitTimeBooking
            );
          });
          const allBookingsByPoly = bookingData.filter((value) => {
            return (
              value.polyclinicId === Number(prePolyId) &&
              value.status === "Approved" &&
              value.bookingDate == dayjs().format("YYYY-MM-DD") &&
              value.doctorId == doctorId
            );
          });
          setBooking(filterBookingsByPoly);
          setLateBooking(filterLateBookingsByPoly);
          setAllBooking(allBookingsByPoly);

          const { data: doctorsResp } = await getDoctorsByPoly(prePolyId);
          setListDoctors(doctorsResp);
          const { data: polyData } = await getDataPolyById(prePolyId);
          setPolyName(polyData.polyclinicName);

          if (role !== "admin") {
            navigate("/dashboard");
          } else {
            socket.connect();
          }
        } catch (err) {
          console.error("Pesan Error:", err);
        }
      } else {
        sessionStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchDataBookings();

    return () => {
      socket.disconnect();
    };
  }, [token, navigate, doctorId, change, inputTime]);

  //Validasi Socket udah connect atau belum
  useEffect(() => {
    if (socket.connected) {
      setIsConnected(true);
      socket.emit("joinRoom", polyId); // Join room berdasarkan polyId
    }

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [polyId, socket]);

  // Select Dokter
  const handleFilterByDoctor = (value) => {
    setDoctorId(value);
  };
  //Tombol Selesai / Batal
  const updateQueue = async (message) => {
    try {
      console.log({ booking });
      console.log({ lateBooking });
      const findIdBooking = allBooking.find(
        (value) => value.queueNumber == Number(number)
      );
      console.log({ findIdBooking });
      if (findIdBooking) {
        const { status: polyStatus } = await updateQueuePoly(polyId, number);
        const { status: bookingStatus } = await updateBooking(
          findIdBooking.id,
          message
        );
        if (polyStatus == 200 && bookingStatus == 200) {
          successToast("Berhasil Memperbarui data!");
          setChange(() => (prev) => !prev);
        } else {
          throw new Error("Gagal Memperbarui data");
        }
      } else {
        throw new Error("Nomor Antrean tidak ditemukan");
      }
    } catch (error) {
      failedToast(error.message);
    }
  };
  // Tombol Panggil
  const sendNumber = () => {
    if (number && !isNaN(number)) {
      socket.emit("updateQueue", { number, polyId });
      successToast(`Memanggil urutan ke-${number}`);
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
        {array.length > 0 ? (
          array?.map((value, i) => (
            <TableRow
              key={i}
              className="cursor-pointer"
              onClick={() => setNumber(Number(value.queueNumber))}
            >
              <TableCell>{value.id}</TableCell>
              <TableCell>{value.queueNumber}</TableCell>
              <TableCell>{value.name}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className="hover:bg-transparent">
            <TableCell>Tidak ada data</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="w-full mt-24">
      <div className="flex flex-wrap justify-center items-start gap-6 p-4 sm:p-10">
        <section className="w-full">
          <BackButton path="/dashboard" />
        </section>

        <div className="flex flex-wrap gap-6 w-full lg:flex-nowrap">
          {/* List Booking By Polyclinic */}
          <section className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-2/3">
            <div className="flex flex-col gap-6">
              {/* Filter Section */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center">
                <div className="flex flex-col w-full sm:w-1/2">
                  <Label className="mb-2">Pilih Dokter</Label>
                  <Select onValueChange={handleFilterByDoctor}>
                    <SelectTrigger className="w-full">
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
                <div className="flex flex-col w-full sm:w-1/2">
                  <Label className="mb-2">Atur Batas Terlambat (Menit)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      className="flex-grow"
                      placeholder="default (15)"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button className="min-w-[100px]" onClick={handleTime}>
                      Ubah
                    </Button>
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="flex flex-col sm:flex-row gap-5 sm:min-h-[300px]">
                <div className="w-full">
                  <Label className="text-start mb-2">Tepat Waktu</Label>
                  <div className="overflow-auto">
                    {renderTable(booking)}
                  </div>
                </div>
                <Separator orientation="vertical" className="hidden sm:block" />
                <div className="w-full">
                  <Label className="text-start mb-2">Terlambat Waktu</Label>
                  <div className="overflow-auto">
                    {renderTable(lateBooking)}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Control Panel */}
          <section className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-full lg:w-1/3">
            <h1 className="text-2xl font-bold text-primary text-center">KONTROL ANTREAN</h1>
            <h2 className="text-xl text-primary/70 text-center">{polyName}</h2>

            <div className="flex flex-col items-center gap-6">
              {/* Number Input and Control Buttons */}
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(Number(e.target.value))}
                  placeholder="Masukkan angka"
                  className="text-center text-7xl w-2/3 h-20 rounded-lg border-primary"
                />
                <div className="flex flex-col gap-2">
                  <Button
                    className="p-2 rounded-lg bg-primary text-white"
                    onClick={() => setNumber((prev) => prev + 1)}
                  >
                    <Plus size={20} />
                  </Button>
                  <Button
                    className="p-2 rounded-lg bg-secondary text-white"
                    onClick={() => setNumber((prev) => prev - 1)}
                  >
                    <Minus size={20} />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 w-full sm:justify-between">
                <Button
                  onClick={sendNumber}
                  className="bg-primary text-white w-full p-3 rounded-lg"
                >
                  Panggil
                </Button>
                <Button
                  onClick={() => updateQueue("Canceled")}
                  className="bg-red-500 hover:bg-red-600 text-white w-5/12 p-3 rounded-lg"
                >
                  <Ban size={20} /> Tolak
                </Button>
                <Button
                  onClick={() => updateQueue("Completed")}
                  className="bg-green-500 hover:bg-green-600 text-white w-5/12 p-3 rounded-lg"
                >
                  <Check size={20} /> Selesai
                </Button>
              </div>
            </div>

            <p className={`mt-4 text-center ${isConnected ? "text-green-500" : "text-red-500"}`}>
              {isConnected ? "Tersambung ke server." : "Tidak tersambung ke server."}
            </p>
          </section>
        </div>
      </div>
    </div>
  )

};

export default HandlerPage;
