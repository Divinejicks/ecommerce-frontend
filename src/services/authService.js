import { toast } from "react-toastify";
import httpClient from "../components/httpClient/httpClient";

export const AuthService  = {
    SignInAuth: async (payload, getCurrentUser) => {
        try {
            const response = await httpClient.post("auth/signin", payload)
            if (response.status === 200) {
                localStorage.setItem("token_key", response.data.accessToken.access_token)
                localStorage.setItem("token_key_refresh", response.data.refreshToken.refresh_token)

                await getCurrentUser()
                return true
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