import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { jwtDecode } from "jwt-decode";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { getUserById } from "@/data/users";
import { failedToast } from "@/lib/toaster";
import Loader from "@/components/Loader";

const ProfilePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const jwt = jwtDecode(token);
    const { name, role, id } = jwt;
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const fetchUserById = async () => {
        const response = await getUserById(id);
        if (response.status == 404) {
            failedToast(response.message);
        } else {
            setData(response.data);
        }
    };

    useEffect(() => {
        fetchUserById();
    }, []);

    return (
        <div className="h-screen flex flex-col p-8">
            <div className="flex justify-end mb-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={handleLogout}>
                                <ChevronRight />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Logout</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
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
                            <Loader />
                        )}
                    </CollapsibleContent>
                    <CollapsibleTrigger>
                        {/* <Button variant="link" className={`${open ? "hidden" : "block"}`}> */}
                        Lihat Selengkapnya
                        {/* </Button> */}
                    </CollapsibleTrigger>
                </Collapsible>

                <Separator className="mb-7 md:w-1/2" />

                <Button asChild className="w-full py-5 md:w-1/2 md:px-8 mb-8 md:mb-5">
                    <Link to="/profile/history">
                        <h3 className="text-lg">History Poliklinik</h3>
                    </Link>
                </Button>
                <Button className="w-full py-5 md:w-1/2 md:px-8">
                    <Link to="/reset-password">
                        <h3 className="text-lg">Reset Password</h3>
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default ProfilePage;
