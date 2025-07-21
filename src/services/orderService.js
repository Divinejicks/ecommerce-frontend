import { toast } from "react-toastify";
import httpClient from "../components/httpClient/httpClient";

export const OrderService = {
    GetMyOrders: async (page, pageSize) => {
        try {
            const response = await httpClient.get(`order/get-all-my-orders-paginated?page=${page}&pageSize=${pageSize}`)
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

    AddNewOrder: async (payload) => {
        try {
            const response = await httpClient.post("order/create", payload)
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

    
}