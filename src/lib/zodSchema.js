import { z } from 'zod'
export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email dibutuhkan" })
        .email("Format Email tidak Valid"),
    password: z
        .string({ required_error: "Password dibutuhkan" })
        .min(8, "Minimal 8 Karakter")
        .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])/, "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol")
})

export const registerSchema = loginSchema.extend({
    confirmPassword: z
        .string({ required_error: "Konfirmasi password dibutuhkan" })
        .min(8, "Minimal 8 Karakter")
        .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])/, "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol"),
    location: z
        .string({ required_error: "Lokasi dibutuhkan" })
        .min(3, "Minimal 3 Karakter")
        .max(30, "Maksimal 30 Karakter"),
    phoneNumber: z
        .string({
            invalid_type_error: "Nomor telepon harus berupa angka",
        })
        .regex(/^\d+$/, { message: "Nomor telepon hanya boleh berisi angka" })
        .min(8, { message: "Minimal 8 digit angka" })
        .max(20, { message: "Maksimal 20 digit angka" }),
    name: z
        .string({ required_error: "Nama dibutuhkan" })
        .min(3, "Minimal 3 Karakter")
        .max(30, "Maksimal 30 Karakter"),
    gender: z
        .enum(["wanita", "pria"], { message: "Jenis Kelamin dibutuhkan" }),
    role: z
        .enum(["user", "admin", "superadmin"], { required_error: "Role dibutuhkan" }),
    birthDate: z
        .string({
            invalid_type_error: "Tanggal Lahir harus berupa angka",
        })
        .regex(/^\d+$/, { message: "Tanggal Lahir hanya boleh berisi angka" })
        .min(8, "Tanggal Lahir belum lengkap")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sesuai",
    path: ["confirmPassword"]
})