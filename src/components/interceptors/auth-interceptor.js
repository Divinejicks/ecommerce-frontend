const AuthInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (req) => {
      const token = localStorage.getItem("token_key");

      if (token) {
        req.headers["Authorization"] = "Bearer " + token;
      }
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

export default AuthInterceptor;
