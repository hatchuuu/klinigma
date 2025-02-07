import dayjs from "dayjs";
import { AlertCircle, Baby, ClipboardList, Monitor, Stethoscope } from "lucide-react";

export const featureServiceArray = [
    {
        handleText: "fasilitas-pelayanan",
        label: "FASILITAS PELAYANAN",
        icon: ClipboardList
    },
    {
        handleText: "dokter-spesialis",
        label: "DOKTER SPESIALIS",
        icon: Stethoscope
    },
]

export const articlesArray = [
    {
        id: 1,
        image: "/artikel-1.jpg",
        date: `${dayjs().format("dddd, DD-MM-YYYY")}`,
        title: "Cara Menghilangkan Bekas Luka dengan Bahan-Bahan Alami",
        description:
            "Luka yang disebabkan aktivitas harian semacam ini bisa memicu bekas luka yang membutuhkan waktu lama untuk hilang. Untungnya, ada cara menghilangkan bekas luka dengan bahan alami yang bisa kamu terapkan.",
        link: "https://www.halodoc.com/artikel/cara-menghilangkan-bekas-luka-dengan-bahan-bahan-alami",
    },
    {
        id: 2,
        image: "/artikel-2.jpg",
        date: `${dayjs().format("dddd, DD-MM-YYYY")}`,
        title: "Kaya Nutrisi, Ini 11 Manfaat Buah Melon Jika Rutin Dikonsumsi",
        description:
            "Melon adalah buah yang segar dan lezat yang banyak ditemukan di Indonesia dan negara-negara lain di dunia. Buah ini memiliki kulit berwarna hijau atau kuning dengan daging berwarna oranye, putih, atau hijau tergantung varietasnya. ",
        link: "https://www.halodoc.com/artikel/kaya-nutrisi-ini-11-manfaat-buah-melon-jika-rutin-dikonsumsi",
    },
    {
        id: 3,
        image: "/artikel-3.jpg",
        date: `${dayjs().format("dddd, DD-MM-YYYY")}`,
        title:
            "Makanan kaya zat bisa bisa kamu peroleh dari sumber heme (hewani) atau non heme (nabati).",
        description:
            "Zat besi adalah mineral yang punya peran vital untuk berbagai fungsi tubuh. Peran utamanya adalah memproduksi hemoglobin dalam sel darah merah yang bertanggung jawab mengangkut oksigen ke seluruh tubuh. ",
        link: "https://www.halodoc.com/artikel/ini-makanan-kaya-zat-besi-yang-mudah-didapatkan",
    },
];

// //dummy service
export const facilityServiceArray = [
    {
        icon: Baby,
        title: "Pediatrics",
        description: "Layanan perawatan kesehatan anak.",
    },
    {
        icon: Stethoscope,
        title: "General Medicine",
        description: "Layanan medis yang komprehensif.",
    },
    {
        icon: Monitor,
        title: "Radiology",
        description: "Pencitraan diagnostik tingkat lanjut.",
    },
    {
        icon: AlertCircle,
        title: "Emergency",
        description: "24/7 emergency care.",
    },
];