import { axiosInstance } from "@/lib/axios"

export const getUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/v1/users/${id}`)
        if (response.status == 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export const getAllUsers = async (filters) => {
    try {
        const response = await axiosInstance.get(`/v1/users`, {
            params: filters
        })
        if (response.status == 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message)
    }
}
