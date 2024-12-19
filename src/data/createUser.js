import { axiosInstance } from "@/lib/axios";

export const createUser = async (value) => {
    try {
        const {
            name,
            email,
            password,
            birthDate,
            location,
            phoneNumber,
            gender,
            role,
        } = value;
        await axiosInstance.post("/users", {
            name,
            email,
            password,
            location,
            phoneNumber,
            gender,
            role,
            birthDate,
            createdAt: new Date(),
            updatedAt: null,
        });
        return { message: "Register Berhasil", status: 201 }
    } catch (error) {
        return { message: "Register Tidak Berhasil", status: 400 }
    }
};
