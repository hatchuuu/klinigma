import { axiosInstance } from "@/lib/axios"

export const updateScheduleByDoctorId = async (filters) => {
    try {
        const response = await axiosInstance.patch(`/v1/schedules/${id}`, filters)
        if (response.status == 201) {
            return response.message
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.error || error.message)
    }
}

export const createSchedules = async (datas, doctorId, polyclinicId) => {
    try {
        const responses = await Promise.allSettled(
            datas.map(data =>
                axiosInstance.post(`/v1/schedules`, { ...data, doctorId, polyclinicId })
            )
        );

        const successResponses = responses.filter(res => res.status === "fulfilled");

        if (successResponses.length === datas.length) {
            return "success";
        } else {
            throw new Error("Gagal Menambahkan Beberapa Jadwal");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
export const getSchedulesByDate = async (filters) => {
    try {
        const response = await axiosInstance.get(`/v1/schedules`,
            { params: filters })
        if (response.status == 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
