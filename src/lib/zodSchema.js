import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email dibutuhkan" })
    .max(30, "Maksimal 30 Karakter")
    .email("Format Email tidak Valid"),
  password: z
    .string({ required_error: "Password dibutuhkan" })
    .min(8, "Minimal 8 Karakter")
    .max(20, "Maksimal 20 Karakter")
    .regex(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])/,
      "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol"
    ),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z
      .string({ required_error: "Konfirmasi password dibutuhkan" })
      .min(8, "Minimal 8 Karakter")
      .max(20, "Maksimal 20 Karakter")
      .regex(
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])/,
        "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol"
      ),
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
    gender: z.enum(["wanita", "pria"], { message: "Jenis Kelamin dibutuhkan" }),
    role: z.enum(["user", "admin", "superadmin"], {
      required_error: "Role dibutuhkan",
    }),
    birthDate: z
      .string({
        invalid_type_error: "Tanggal Lahir harus berupa angka",
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format Tanggal Lahir Keliru" })
      .min(8, "Tanggal Lahir belum lengkap"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sesuai",
    path: ["confirmPassword"],
  });

export const doctorsSchema = z.object({
  name: z
    .string({ required_error: "Name is Required" })
    .min(3, "Minimal 3 Karakter")
    .max(100, "Maksimal 100 Karakter"),
  polyName: z
    .string({ required_error: "Poly Name is Required" })
    .min(3, "Minimal 3 Karakter")
    .max(100, "Maksimal 100 Karakter"),
  gender: z.enum(["wanita", "pria"], { message: "Gender is Required" }),
  email: z
    .string({ required_error: "Email is Required" })
    .max(30, "Maksimal 30 Karakter")
    .email("Format Email tidak Valid"),
  descriptions: z
    .string({ required_error: "Descriptions are Required" })
    .min(3, "Minimal 3 Karakter")
    .max(200, "Maksimal 200 Karakter"),
  location: z
    .string({ required_error: "Location is Required" })
    .min(3, "Minimal 3 Karakter")
    .max(200, "Maksimal 200 Karakter"),
    phoneNumber: z
    .string()
    .regex(
      /^(?:\+62|62|0)8[1-9]\d{6,12}$/,
      "Nomor Telepon tidak valid, gunakan format yang benar."
    )
    .min(10, "Nomor Telepon minimal 10 digit")
    .max(15, "Nomor Telepon maksimal 15 digit"),
  open: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Start Time is Invalid")
    .optional(),
  close: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "End Time is Invalid")
    .optional(),
  day: z.enum(
    ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    {
      message: "Day is Required",
    }
  ),
});
