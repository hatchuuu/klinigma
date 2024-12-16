import { userInstance } from "@/lib/axios";

export const getDataPolyById = async (id) => {
    console.log(id);
    try {
        const response = await userInstance.get(`/polyclinics/${id}`)
        return { status: 200, message: "Data Berhasil diterima", data: response.data }
    } catch (error) {
        return { status: 404, message: "Data Tidak ditemukan" }
    }
}