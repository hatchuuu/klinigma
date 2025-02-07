import { BriefcaseMedical, Calendar, ContactRound, Hospital, House, Phone, Shield, Ticket, User, Users } from "lucide-react";

export const navItemUsers = [
    {
        title: "Beranda",
        url: "/dashboard",
        icon: House,
    },
    {
        title: "Pendaftaran",
        url: "/pendaftaran",
        icon: Ticket,
    },
    {
        title: "Antrean",
        url: "/antrean",
        icon: Users,
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
        icon: Phone,
    },
    {
        title: "Antrean",
        url: "/admin/antrean",
        icon: Users,
    },
    {
        title: "Dokter",
        url: "/admin/dokter",
        icon: BriefcaseMedical,
    },
    {
        title: "Profil",
        url: "/profil",
        icon: User,
    },
];

export const navItemSuperAdmins = [
    {
        title: "Beranda",
        url: "/dashboard",
        icon: House,
    },
    {
        title: "Poliklinik",
        url: "/admin/poliklinik",
        icon: Hospital,
    },
    {
        title: "Dokter",
        url: "/admin/dokter",
        icon: BriefcaseMedical,
    },
    {
        title: "Admin",
        url: "/admin/admins",
        icon: Shield,
    },
    {
        title: "User",
        url: "/admin/user",
        icon: ContactRound,
    },
    {
        title: "Antrean",
        url: "/admin/antrean",
        icon: Users,
    },
    {
        title: "Profil",
        url: "/profil",
        icon: User,
    },
];