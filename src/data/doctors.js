import { axiosInstance } from "@/lib/axios"

export const getAllDoctors = async (filters) => {
    try {
        const response = await axiosInstance.get(`/v1/doctors`, {
            params: filters
        })
        if (response.status == 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message)
    }
}


export const getDoctorsByPoly = async (polyId) => {
    try {
        const { data: docResponse } = await axiosInstance.get("/doctors")
        const filteredByIdPoly = docResponse.filter((value) => {
            return value.polyclinicId == polyId
        })
        return { status: 200, data: filteredByIdPoly }
    } catch (error) {
        return { status: 400, data: error }
    }
}
export const getDoctorById = async (doctorId) => {
    try {
        const { data: docResponse } = await axiosInstance.get(`/doctors/${doctorId}`)
        return { status: 200, data: docResponse }
    } catch (error) {
        return { status: 400, data: error }
    }
}

export const getDoctorForTeam = async () => {
    try {
        const { data: docResponse } = await axiosInstance.get(`/doctors`)
        return { status: 200, data: docResponse }
    } catch (error) {
        return { status: 400, data: error }
    }
}

