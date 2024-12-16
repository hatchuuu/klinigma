import { userInstance } from "@/lib/axios"

export const getUserById = async (id) => {
    try {
        const response = await userInstance.get(`/users/${id}`)
        return response
    } catch (error) {
        return { status: 404, message: "ID tidak ditemukan", error }
    }
}
export const getAllUsers = async () => {
    try {
        const response = await userInstance.get(`/users`)
        return response
    } catch (error) {
        return { status: 404, message: "Gagal Mendapatkan User", error }
    }
}

