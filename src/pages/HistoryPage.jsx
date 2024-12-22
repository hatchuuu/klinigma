import { Button } from "@/components/ui/Button";
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
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 5;



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
                        console.log({ polysData });
                        // Filter bookings by userId and add polyName
                        const filteredBookingById = responseBookings?.data?.filter(
                            (value) => value.userId === id && (value.status === "Completed" || value.status === "Canceled")
                        );
                        let filterBookings = [];
                        for (let i = 0; i < filteredBookingById.length; i++) {
                            let booking = { ...filteredBookingById[i] };
                            for (let j = 0; j < polysData.data.length; j++) {
                                let poly = polysData.data[j];
                                if (booking.polyclinicId === poly.id) {
                                    booking["polyName"] = poly.polyclinicName;
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


    // Calculate total pages


    const totalPages = Math.ceil(allBookings?.length / bookingsPerPage);
    const startIndex = (currentPage - 1) * bookingsPerPage;
    const currentBookings = allBookings?.slice(startIndex, startIndex + bookingsPerPage);


    // Render bookings for the current page
    const renderBookings = () =>
        currentBookings.map((value, i) => (
            <div key={i} className="p-4 mb-6 bg-white shadow rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{value.polyName}</h3>
                    <h3 className="text-lg font-semibold text-primary">{value.queueNumber}</h3>
                    <span
                        className={`text-sm font-medium py-1 px-3 rounded-full ${value.status === "Completed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            }`}
                    >
                        {value.status === "Completed" ? "Selesai" : "Dibatalkan"}
                    </span>
                </div>
            </div>
        ));

    // Handle page change
    const goToPage = (page) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="min-h-screen flex flex-col p-6 sm:p-12 mt-24 bg-gray-50 w-full">
            <div className="flex flex-col sm:w-3/5 lg:w-4/5 mx-auto bg-white shadow rounded-lg p-6">
                <section className="flex flex-col items-center gap-2 mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 uppercase">Riwayat Booking</h1>
                    <p className="text-sm text-gray-500">Data pemesanan yang tersedia</p>
                </section>

                <div>
                    {currentBookings?.length > 0 ? (
                        renderBookings()
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            Tidak ada data antrean yang tersedia.
                        </p>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <Button
                            onClick={() => goToPage(currentPage - 1)}
                            className={`px-4 py-2 border rounded-lg text-gray-700 ${currentPage === 1 ? "cursor-not-allowed bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </Button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Button
                                key={index}
                                onClick={() => goToPage(index + 1)}
                                className={`px-4 py-2 border rounded-lg ${currentPage === index + 1
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    }`}
                            >
                                {index + 1}
                            </Button>
                        ))}
                        <Button
                            onClick={() => goToPage(currentPage + 1)}
                            className={`px-4 py-2 border rounded-lg text-gray-700 ${currentPage === totalPages ? "cursor-not-allowed bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}

                <div className="sm:mt-10 mt-3 flex justify-end">
                    <Link to={"/profile"}>
                        <Button
                            onClick={() => console.log("Back clicked")}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                        >
                            Kembali
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );

};

export default HistoryPage