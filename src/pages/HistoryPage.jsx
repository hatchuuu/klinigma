import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getAllDataBooking } from "@/data/bookings";
import { getAllDataPoly } from "@/data/poly";
import { Separator } from "@/components/ui/separator";

const HistoryPage = () => {
    const [allBookings, setAllBookings] = useState(null);
    const [name, setName] = useState(null);
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if token exists before decoding
                if (token) {
                    const { id, role, name } = jwtDecode(token);
                    setName(name);
                    if (role === "user" || role === "superadmin") {
                        const responseBookings = await getAllDataBooking();
                        const polysData = await getAllDataPoly();
                        // Filter bookings by userId and add polyName
                        const filteredBookingById = responseBookings?.data?.filter(
                            (value) => value.userId === id && (value.status === "Completed" || value.status === "Rejected")
                        );
                        let filterBookings = [];
                        for (let i = 0; i < filteredBookingById.length; i++) {
                            let booking = { ...filteredBookingById[i] };
                            for (let j = 0; j < polysData.data.length; j++) {
                                let poly = polysData.data[j];
                                if (booking.polyclinicId === poly.id) {
                                    booking["polyName"] = poly.polyName;
                                    break;
                                }
                            }
                            filterBookings.push(booking);
                        }
                        setAllBookings(filterBookings);
                    } else {
                        navigate("/profile")
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error, e.g., show error message to user
            }
        };

        fetchData();
    }, []); // Re-run effect if token changes

    const renderBookings = () =>
        allBookings.map((value, i) => (
            <div key={i}>
                <div className="flex justify-between mb-7 items-center">
                    <h3 className="text-xl ">{value.polyName}</h3>
                    <h3 className="text-xl">{value.queueNumber}</h3>
                    <h3 className={`${value.status == "Done" ? "bg-green-400" : "bg-red-400"} py-1 px-2 text-xl rounded-md`}>{value.status}</h3>
                </div>
                <Separator className="mb-7" />
            </div>
        )
        )
    return (
        <div className="h-screen items-center flex flex-col p-8 sm:pt-32 pt-20">
            {allBookings ? (
                <div className={`flex flex-col sm:w-3/5`}>
                    <section className="flex flex-col justify-center items-center gap-1 mb-20">
                        <h1 className="text-4xl font-semibold uppercase">{name}</h1>
                    </section>
                    <div>
                        <div className="flex justify-between mb-7">
                            <h3 className="text-xl ">Poliklinik</h3>
                            <h3 className="text-xl">Antrean</h3>
                            <h3 className="text-xl">Status</h3>
                        </div>
                        <Separator className="mb-7" />
                    </div>
                    <div>
                        {
                            allBookings.length > 0
                                ? renderBookings()
                                : <p className="pb-4 text-center">Belum Belum Pernah Mengambil Antrean</p>
                        }
                    </div>
                    <div className={` w-full flex justify-end mb-5`}>
                        <Link to="/profile">
                            <Button>
                                Kembali
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className='flex w-full justify-center items-center p-2'>
                    <p className='page-loader' />
                </div>
            )}
        </div>
    );
};

export default HistoryPage