import { axiosInstance } from "@/lib/axios"

export const getAllQueuesByUser = async (filters) => {
    try {
        const response = await axiosInstance.get(`/v1/queues`, {
            params: filters
        })
        if (response.status == 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message)
    }
}
export const updateQueueById = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/v1/queues/${id}`, data)
        if (response.status == 201) {
            return response.message
        }
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message)
    }
}

export const createQueueByUser = async (data) => {
    try {
        const response = await axiosInstance.post(`/v1/queues`, data)
        if (response.status == 201) {
            return response.message
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.error || error.message)
    }
}



export const getAllQueue = async () => {
    try {
        const response = await axiosInstance.get(`/queues`)
        return { status: 200, message: "Data Berhasil diterima", data: response.data }
    } catch (error) {
        return { status: 404, message: "Data Tidak ditemukan" }
    }
}