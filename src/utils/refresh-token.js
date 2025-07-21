import axios from "axios";

export const RefreshTokenAccess = async () => {
  const refreshToken = localStorage.getItem("token_key_refresh");

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}auth/refresh`,
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const newAccessToken = res.data.accessToken.access_token;
    const newRefreshToken = res.data.refreshToken.refresh_token;

    localStorage.setItem("token_key", newAccessToken);
    localStorage.setItem("token_key_refresh", newRefreshToken);

    return newAccessToken; // ✅ return the new token so the interceptor can retry the request
  } catch (error) {
    console.error("Refresh token failed", error);
    localStorage.removeItem("token_key");
    localStorage.removeItem("token_key_refresh");
    window.location.href = "/";
    return null;
  }
};
