import axios from "axios";

const loginInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_API_USER_URL,
    }
)

export default loginInstance