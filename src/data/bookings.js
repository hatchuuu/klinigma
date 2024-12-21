import { axiosInstance } from "@/lib/axios"

export const getAllDataBooking = async () => {
    try {
        const response = await axiosInstance.get(`/bookings`)
        return { status: 200, message: "Data Berhasil diterima", data: response.data }
    } catch (error) {
        return { status: 404, message: "Data Tidak ditemukan" }
    }
}

export const updateBooking = async (id, status, date = null) => {
    try {
        const payload = { status };
        if (date !== null) {
            payload["updatedAt"] = new Date().toISOString();
        }
        await axiosInstance.patch(`/bookings/${id}`, payload)
        return { status: 200, message: "Data Berhasil Diubah" }
    } catch (error) {
        return { status: 400, message: "Data Gagal Diubah" }
    }
}