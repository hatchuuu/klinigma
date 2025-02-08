import { axiosInstance } from "@/lib/axios"

export const getUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/v1/users/${id}`)
        if (response.status == 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message)
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
export const createUser = async (data) => {
    try {
        const response = await axiosInstance.post(`/auth/register`, data)
        if (response.status == 201) {
            return response.data
        }
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message || "Registrasi gagal")
    }
}
