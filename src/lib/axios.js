import axios from "axios";

export const loginInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_API_SUPERADMIN_URL,
    }
)
export const userInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_API_USERS_URL,
    }
)

