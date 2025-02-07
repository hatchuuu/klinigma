import { axiosInstance } from "@/lib/axios"

export const getAllPolyclinics = async () => {
    try {
        const response = await axiosInstance.get(`/v1/polyclinics`)
        if (response.status == 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(error.message || error.response?.data?.error)
    }
}