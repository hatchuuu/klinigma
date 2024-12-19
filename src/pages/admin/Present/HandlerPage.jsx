import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllDataBooking } from '@/data/bookings';
import { getDataPolyById } from '@/data/poly';
import { ChevronUp, Minus, Plus } from 'lucide-react';

const HandlerPage = () => {

    const socket = io(import.meta.env.VITE_SOCKET_URL);
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token")
    const [number, setNumber] = useState(0);
    const [polyId, setPolyId] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [booking, setBooking] = useState([])
    const [polyName, setPolyName] = useState("")

    //Validasi Token
    useEffect(() => {
        const fetchDataBookings = async () => {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const [role, prePolyId] = decodedToken.role.split("-");
                    setPolyId(prePolyId);
                    const { data: bookingData } = await getAllDataBooking()
                    const filterBookingsByPoly = bookingData.filter((value) => {
                        return value.polyclinicId === prePolyId
                    })
                    setBooking(filterBookingsByPoly)

                    const { data: polyData } = await getDataPolyById(prePolyId)
                    setPolyName(polyData.polyName)

                    if (role !== "admin") {
                        navigate("/dashboard");
                    } else {
                        socket.connect()
                    }
                } catch (err) {
                    console.error("Invalid token:", err);
                    sessionStorage.removeItem("token");
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }
        }

        fetchDataBookings()

        return () => {
            socket.disconnect();
        };
    }, [token, navigate]);

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


    const sendNumber = () => {
        if (number && !isNaN(number)) {
            socket.emit('updateQueue', { number, polyId }
            );
        } else {
            alert("Masukkan angka valid");
        }
    };

    return (
        <div className="flex justify-center pt-20  bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
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
                        className="w-2/3 mt-2 h-32 text-[80px]"
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

                <div className="flex justify-center items-center">
                    <Button
                        onClick={sendNumber}
                        className="w-3/4 text-center py-4 "
                    >
                        Kirim Angka
                    </Button>
                </div>

                <p className="mt-6 text-center text-gray-600">
                    {isConnected ? "Tersambung ke server." : "Tidak tersambung ke server."}
                </p>
            </div>
        </div>
    );
};

export default HandlerPage;
