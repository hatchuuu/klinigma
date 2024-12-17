import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserById } from "@/data/users";

const ProfilePage = () => {
    const navigate = useNavigate();

    const [data, setData] = useState();

    const token = localStorage.getItem("token");
    const jwt = jwtDecode(token);
    const { name, role, id } = jwt;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const fetchUserById = async () => {
            const response = await getUserById(id);
            setData(response.data);
        };
        fetchUserById();
    });

    return (
        <div className="flex flex-col p-8">
            <div className="flex justify-between items-center mb-8  ">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={"/dashboard"}>
                                <Button>
                                    <ChevronLeft />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Back</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <h1 className="text-2xl">Profile</h1>

                <Link to={"/profile/history"}>
                    <h2 className="text-xl text-purple-950">History</h2>
                </Link>
            </div>

            <div className="flex mt-5 mb-8">
                <div className="w-16 h-16 me-7">
                    <img
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <h3 className="text-xl text-gray-600">{role === "superadmin" ? "Super Admin" : role === "admin" ? "Admin" : role === "user" ? "User" : name}</h3>
                </div>
            </div>


            {data ? (


                <div className="flex flex-col">
                    <div className="flex justify-between mb-7">
                        <h3 className="text-xl text-gray-600">Name</h3>
                        <h3 className="text-xl">{name}</h3>
                    </div>

                    <Separator className="mb-7" />

                    <div className="flex justify-between mb-7">
                        <h3 className="text-xl text-gray-600">Date of birth</h3>
                        <h3 className="text-xl">{data.birthDate}</h3>
                    </div>

                    <Separator className="mb-7" />

                    <div className="flex justify-between mb-7">
                        <h3 className="text-xl text-gray-600">Phone number</h3>
                        <h3 className="text-xl">{data.phoneNumber}</h3>
                    </div>

                    <Separator className="mb-7" />

                    <div className="flex justify-between mb-7">
                        <h3 className="text-xl text-gray-600">Gender</h3>
                        <h3 className="text-xl">{data.gender === "pria" ? "Laki-laki" : data.gender ? "Wanita" : data.gender}</h3>
                    </div>

                    <Separator className="mb-7" />

                    <div className="flex justify-between mb-7">
                        <h3 className="text-xl text-gray-600">Email</h3>
                        <h3 className="text-xl">{data.email}</h3>
                    </div>

                    <Separator className="mb-7" />

                    {/* <div className="flex justify-between mb-7">
                        <h3 className="text-xl text-gray-600">Password</h3>
                        <Link>
                            <h3 className="text-xl text-purple-950">Change Password</h3>
                        </Link>
                    </div> */}

                    <Button className="w-full rounded-3xl" onClick={handleLogout}>
                            <h3 className="text-lg">Logout</h3>
                    </Button>

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
