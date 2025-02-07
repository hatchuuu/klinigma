import { axiosInstance } from "@/lib/axios"

export const getAdminById = async (id) => {
    try {
        const response = await axiosInstance.get(`/v1/admins/${id}`)
        if (response.status == 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}