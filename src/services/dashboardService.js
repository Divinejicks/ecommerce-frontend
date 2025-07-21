import { toast } from "react-toastify";
import httpClient from "../components/httpClient/httpClient";

export const DashboardService  = {
    GetDashboardData: async () => {
        try {
            const response = await httpClient.get("dashboard/get-dashboard-data");
            console.log("response", response)
            if (response.status === 200) {
                return response.data
            } else {
                toast.error(response.data.message)
                return null
            }
        } catch (error) {
            toast.error("Server error, please try again. If this persist please contact the administrator")
            console.log(error)
        }
    }
}