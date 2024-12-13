import { z } from 'zod'
export const loginSchema = z.object({
    email: z
        .string(40)
        .email("Format Email tidak Valid"),
    password: z
        .string(20)
        .min(8, "Minimal 8 Karakter")
        .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])/, "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol")
})