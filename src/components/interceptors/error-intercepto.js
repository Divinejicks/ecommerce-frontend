import { RefreshTokenAccess } from "../../utils/refresh-token";

const ErrorInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    res => res,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        localStorage.getItem("token_key_refresh")
      ) {
        originalRequest._retry = true;

        const newAccessToken = await RefreshTokenAccess();

        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default ErrorInterceptor;
