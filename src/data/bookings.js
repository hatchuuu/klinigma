import { axiosInstance } from "@/lib/axios"

export const getAllDataBooking = async () => {
    try {
        const response = await axiosInstance.get(`/bookings`)
        return { status: 200, message: "Data Berhasil diterima", data: response.data }
    } catch (error) {
        return { status: 404, message: "Data Tidak ditemukan" }
    }
}

export const approveBooking = async (id) => {
    try {
        await axiosInstance.patch(`/bookings/${id}`, {
            status: "Approved"
        })
        return { status: 200, message: "Data Berhasil Disetujui" }
    } catch (error) {
        return { status: 400, message: "Data Gagal Disetujui" }
    }
}