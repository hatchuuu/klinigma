import axios from "axios";

export const userInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_API_USER_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    }
)