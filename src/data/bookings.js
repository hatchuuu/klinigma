import { axiosInstance } from "@/lib/axios"

export const getAllDataBooking = async () => {
    try {
        const response = await axiosInstance.get(`/bookings`)
        return { status: 200, message: "Data Berhasil diterima", data: response.data }
    } catch (error) {
        return { status: 404, message: "Data Tidak ditemukan" }
    }
}