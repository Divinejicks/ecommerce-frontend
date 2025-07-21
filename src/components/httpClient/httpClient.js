import axios from "axios";
import AuthInterceptor from "../interceptors/auth-interceptor";
import ErrorInterceptor from "../interceptors/error-intercepto";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

AuthInterceptor(httpClient);
ErrorInterceptor(httpClient);

export default httpClient;
