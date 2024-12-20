import { axiosInstance } from "@/lib/axios"

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