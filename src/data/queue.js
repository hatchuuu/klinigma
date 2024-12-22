import { axiosInstance } from "@/lib/axios"

export const getAllQueue = async () => {
    try {
        const response = await axiosInstance.get(`/queues`)
        return { status: 200, message: "Data Berhasil diterima", data: response.data }
    } catch (error) {
        return { status: 404, message: "Data Tidak ditemukan" }
    }
}