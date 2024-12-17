import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserById } from "@/data/users";
import AlertButton from "@/components/AlertButton";

const ProfilePage = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const jwt = jwtDecode(token);
    const { name, role, id } = jwt;

    const handleLogout = () => {
        sessionStorage.removeItem("token");
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
        <div className="h-screen flex flex-col p-8 sm:pt-32">
            <div className="flex flex-col items-center justify-center">
                <div className="w-48 h-48 md:w-40 md:h-40 mb-5">
                    <img
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <h3 className="text-2xl text-center mb-3">{name}</h3>
                <h3 className="text-2xl text-center mb-3">{role}</h3>

                <Collapsible open={open} onOpenChange={setOpen}>
                    <CollapsibleContent>
                        {data ? (
                            <>
                                <h1>Tanggal Lahir : {data?.birthDate}</h1>
                                <h1>Domisili : {data?.location}</h1>
                            </>
                        ) : (
                            <div className='flex w-full justify-center items-center p-2'>
                                <p className='page-loader' />
                            </div>
                        )}
                    </CollapsibleContent>
                    <CollapsibleTrigger asChild>
                        <Button variant="link" className={`${open ? "hidden" : "block"}`}>
                            Lihat Selengkapnya
                        </Button>
                    </CollapsibleTrigger>
                </Collapsible>

                <Separator className="mb-7 md:w-1/2" />

                <div className="flex flex-col gap-4 w-full justify-center items-center">
                    <Button className="w-full py-5 md:w-1/2 md:px-8" asChild>
                        <Link to="/profile/history">
                            <h3 className="text-lg">History Poliklinik</h3>
                        </Link>
                    </Button>
                    <Button className="w-full py-5 md:w-1/2 md:px-8" asChild>
                        <Link to="/reset-password">
                            <h3 className="text-lg">Reset Password</h3>
                        </Link>
                    </Button>
                    <Button className="w-full md:w-1/2 md:px-8" asChild>
                        <AlertButton handleLogout={handleLogout} />
                    </Button>
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
