import { axiosInstance } from "@/lib/axios"

export const getUserById = async (id) => {
    try {
        console.log({ id });
        const response = await axiosInstance.get(`/users/${id}`)
        return response
    } catch (error) {
        return { status: 404, message: "ID tidak ditemukan", error }
    }
}
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`/users`)
        return response
    } catch (error) {
        return { status: 404, message: "Gagal Mendapatkan User", error }
    }
}

export const getUsersbyRole = async () => {
    try {
        const response = await axiosInstance.get(`/users`);
        const filteredUsers = response.data.filter(user => user.role === 'user');
        console.log("filteredUsers", filteredUsers)
        return filteredUsers;
    } catch (error) {
        return { status: 404, message: "Gagal Mendapatkan User", error };
    }
};

