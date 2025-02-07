import { axiosInstance } from "@/lib/axios"

export const getAllPolyclinics = async (filters) => {
    try {
        const response = await axiosInstance.get(`/v1/polyclinics`, {
            params: filters
        })
        if (response.status == 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message)
    }
}