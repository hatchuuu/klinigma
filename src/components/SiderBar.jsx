import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar, House, Menu, ShieldCheck, Stethoscope, User, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export function SiderBar() {
    let items = [
        {
            title: "BERANDA",
            url: "/dashboard",
            icon: House,
        },
        {
            title: "ANTREAN",
            url: "/booking",
            icon: Calendar,
        },
        {
            title: "DATA DIRI",
            url: "/profile",
            icon: User,
        }
    ]
    const token = sessionStorage.getItem("token")
    if (token) {
        const { role } = jwtDecode(token)
        const [isAdmin] = role.split("-")
        if (isAdmin === "admin") {
            const antreanObject = {
                title: "ATUR ANTREAN",
                url: "/admin/handler",
                icon: ShieldCheck,
            };
            const doctorObject = {
                title: "MENU DOKTER",
                url: "/doctors",
                icon: Stethoscope,
            }
            const userObject = {
                title: "MENU USER",
                url: "/users",
                icon: Users,
            }
            const modifiedItems = [...items, doctorObject, userObject];
            modifiedItems[1] = antreanObject; // Ganti elemen kedua
            items = modifiedItems;
        }
    } else {
        sessionStorage.removeItem("token")
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="hover:bg-accent">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex justify-center flex-col items-center gap-2">
                        <img src="/klinigma.png" alt="sdfsdf" className="w-28" />
                        <p className="text-xs">Kesehatanmu ada di genggaman mu</p>
                    </SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-10">
                    {items.map((item, i) => (
                        <Button key={i} variant="secondary" className='w-full flex bg-purple-200 justify-center' asChild>
                            <Link to={item.url} className='h-[40px] text-lg font-bold'>
                                <item.icon className="text-black" />
                                <span>{item.title}</span>
                            </Link>
                        </Button>
                    ))}

                </div>
            </SheetContent>
        </Sheet>
    )
}
