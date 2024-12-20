import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserById } from "@/data/users";
import AlertButton from "@/components/AlertButton";
import { formatDate } from "@/data/service";
import { History } from "lucide-react";
import { getDataPolyById } from "@/data/poly";

const ProfilePage = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const jwt = jwtDecode(token);
    const { name, role, id } = jwt;
    const [isAdmin, polyId] = role.split("-")
    const [data, setData] = useState();
    const [polyName, setPolyName] = useState();
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await getUserById(id);
                setData(userResponse.data);

                if (isAdmin === "admin") {
                    const polyResponse = await getDataPolyById(polyId);
                    setPolyName(polyResponse.data.polyclinicName);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, polyId, isAdmin]);

    const array = [
        { title: "Email", data: data?.email },
        { title: "Tanggal Lahir", data: formatDate(data?.birthDate).fullDate },
        { title: "Nomor Telepon", data: data?.phoneNumber },
        { title: "Jenis Kelamin", data: data?.gender }
    ]

    const rowProfile = () =>
        array.map((value, i) => (
            <div key={i}>
                <div className="flex justify-between mb-7">
                    <h3 className="text-xl text-gray-600">{value.title}</h3>
                    <h3 className="text-xl">{value.data}</h3>
                </div>
                <Separator className="mb-7" />
            </div>
        )
        )
    return (
        <div className="h-screen items-center flex flex-col p-8 md:pt-32 pt-20">
            {data ? (
                <div className={`flex flex-col sm:w-3/5`}>
                    <section className="flex flex-col justify-center items-center gap-1 mb-20">
                        <h1 className="text-4xl font-semibold uppercase">{name}</h1>
                        <h1 className="text-base font-semibold capitalize">({isAdmin == "admin" ? "admin " + polyName : role})</h1>
                    </section>
                    <div>
                        {
                            rowProfile()
                        }
                    </div>
                    <div className={` w-full flex  ${isAdmin != "admin" ? "justify-between" : "justify-end"} mb-5`}>
                        {
                            isAdmin != "admin" &&
                            <Link to="/profile/history">
                                <Button className="py-4 px-6">
                                    <History size={15} />
                                    Riwayat Antrean
                                </Button>
                            </Link>
                        }
                        <div>
                            <AlertButton handleLogout={handleLogout} />
                        </div>
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

export default ProfilePage;
