import { axiosInstance } from "@/lib/axios";

export const getDataPolyById = async (id) => {
    try {
        const response = await axiosInstance.get(`/polyclinics/${id}`)
        return { status: 200, message: "Data Berhasil diterima", data: response.data }
    } catch (error) {
        return { status: 404, message: "Data Tidak ditemukan" }
    }
}
export const getAllDataPoly = async () => {
    try {
        const response = await axiosInstance.get(`/polyclinics`)
        return { status: 200, message: "Data Berhasil diterima", data: response.data }
    } catch (error) {
        return { status: 404, message: "Data Tidak ditemukan" }
    }
}
export const updateQueuePoly = async (id, number) => {
    try {
        await axiosInstance.patch(`/polyclinics/${id}`, {
            currentQueue: number,
        })
        return { status: 200, message: "Antrean Berhasil diubah" }
    } catch (error) {
        return { status: 404, message: "Data Tidak ditemukan" }
    }
}