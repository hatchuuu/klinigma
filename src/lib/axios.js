import axios from "axios";

export const userInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_API_USERS_URL,
    }
)

export const loginSuperInstance = axios.create({
    baseURL: import.meta.env.VITE_API_LOGIN_SUPERADMIN_URL,

});

export const loginAdminInstance = axios.create({
    baseURL: import.meta.env.VITE_API_LOGIN_ADMIN_URL,
});

export const loginUserInstance = axios.create({
    baseURL: import.meta.env.VITE_API_LOGIN_USER_URL,
});

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3002/",
});

