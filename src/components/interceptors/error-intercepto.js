const ErrorInterceptor = (axiosInstance) => {

    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },
        error => {
            console.group("Error");
            console.log(error);
            console.groupEnd();

            return error.response
        }
    )
}

export default ErrorInterceptor;