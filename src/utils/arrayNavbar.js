import { Calendar, House, User } from "lucide-react";

export const navItemUsers = [
    {
        title: "Beranda",
        url: "/dashboard",
        icon: House,
    },
    {
        title: "Pendaftaran",
        url: "/pendaftaran",
        icon: User,
    },
    {
        title: "Antrean",
        url: "/antrean",
        icon: Calendar,
    },
    {
        title: "Profil",
        url: "/profil",
        icon: User,
    },
];

export const navItemAdmins = [
    {
        title: "Beranda",
        url: "/dashboard",
        icon: House,
    },
    {
        title: "Atur Pemanggilan",
        url: "/admin/antrean/panggilan",
        icon: User,
    },
    {
        title: "Dokter",
        url: "/admin/dokter",
        icon: User,
    },
    {
        title: "Antrean",
        url: "/admin/antrean",
        icon: User,
    },
    {
        title: "Profil",
        url: "/profil",
        icon: User,
    },
];