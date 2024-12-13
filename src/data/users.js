import { userInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const fetchDataUsers = () => {
    return useQuery({
        queryFn: async () => {
            const response = await userInstance.get("/users")
            return response.data
        },
        queryKey: ['fetchUsers']
    })
}
