import { toast } from "react-toastify";
import httpClient from "../components/httpClient/httpClient";

export const CategoryService = {
    GetAllCAtegoryByPagination: async (page, pageSize) => {
        try {
            const response = await httpClient.get(`category/get-all-paginated?page=${page}&pageSize=${pageSize}`)
            if (response.status === 200) {
                return response
            } else {
                toast.error(response.data.message)
                return false
            }
        } catch (error) {
            toast.error("Server error, please try again. If this persist please contact the administrator")
            console.log(error)
        }
    },

    AddNewCategory: async (payload) => {
        try {
            const response = await httpClient.post("category/create", payload)
            if (response.status === 200) {
                return response
            } else {
                toast.error(response.data.message)
                return false
            }
        } catch (error) {
            toast.error("Server error, please try again. If this persist please contact the administrator")
            console.log(error)
        }
    },

    GetAllCategories: async () => {
        try {
            const response = await httpClient.get(`category/get-all`)
            if (response.status === 200) {
                return response
            } else {
                toast.error(response.data.message)
                return false
            }
        } catch (error) {
            toast.error("Server error, please try again. If this persist please contact the administrator")
            console.log(error)
        }
    }
}