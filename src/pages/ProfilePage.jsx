import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

const ProfilePage = () => {
    return (
        <div className="h-screen flex flex-col p-8">
            <div className="flex justify-end mb-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={"/dashboard"}>
                                <Button size="default">
                                    <ChevronRight />
                                </Button>
                            </Link>
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
                <h3 className="text-2xl text-center mb-3">Muhammad Bintang Alfarisyi</h3>
                {/* <Divider className="mb-7 md:w-1/2" /> */}
                <Separator className="mb-7 md:w-1/2"/>
                <Button asChild className="w-full py-5 md:w-1/2 md:px-8 mb-8 md:mb-5">
                    <Link to="/profile/history" className="w-full">
                        <h3 className="text-lg">History Poliklinik</h3>
                    </Link>
                </Button>
                <Button className="w-full py-5 md:w-1/2 md:px-8">
                    <h3 className="text-lg">Ubah Password</h3>
                </Button>
            </div>
        </div>
    )
}

export default ProfilePage