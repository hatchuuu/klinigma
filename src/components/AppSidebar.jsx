
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { navItemAdmins, navItemSuperAdmins } from "@/utils/arrayNavbar"
import { useAuthStore } from "@/store/store"
import { jwtDecode } from "jwt-decode"
import { useLocation } from "react-router-dom"



export function AppSidebar() {
    const token = useAuthStore(state => state.token)
    const { pathname } = useLocation()

    let array = []
    const { role } = token ? jwtDecode(token) : {}
    if (role == "admin") {
        array = navItemAdmins
    } else if (role == "superadmin") {
        array = navItemSuperAdmins
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="h-[77px]  bg-neon mb-2 flex justify-center items-center w-full">
                        <img src="/klinigma.png" alt="Logo" width={80} />
                    </SidebarGroupContent>
                    <SidebarGroupContent className=" p-4 mb-2">
                        <SidebarMenu>
                            {array.map((item) => (
                                <SidebarMenuItem key={item.title} className="border-gray-200 border-b-2 py-2">
                                    <SidebarMenuButton asChild className={`${item.url == pathname && "bg-neon text-white"}`}>
                                        <Link to={item.url}>
                                            <item.icon size={18} />
                                            <p className="font-publicSans text-base ms-3">{item.title}</p>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
