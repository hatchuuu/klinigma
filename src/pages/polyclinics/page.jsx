import { axiosInstance } from "@/lib/axios"
import { useEffect, useState } from "react"

const page = () => {
    const [polys, setPolys] = useState([])
    useEffect(() => {
        const fetchPolyclinics = async () => {
            const response = await axiosInstance.get("/polyclinics");
            const data = response.data;
            console.log(data);
        }
        fetchPolyclinics()
    }, [])

    return (
        <div>
            WKWKW
        </div>
    )
}

export default page