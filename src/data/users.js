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

export const getUsersbyRole = async () => {
    try {
        const response = await axiosInstance.get(`/users`);
        const filteredUsers = response.data.filter(user => user.role === 'user');
        return filteredUsers;
    } catch (error) {
        return { status: 404, message: "Gagal Mendapatkan User", error };
    }
};

