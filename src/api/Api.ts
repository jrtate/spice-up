import axios from "axios";
import { add } from "date-fns";
import { invalidateTokenSession } from "../utils/tokenService";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (
      originalConfig.url !== "/auth/login" &&
      err.response &&
      !originalConfig._retry
    ) {
      // Access Token was expired
      originalConfig._retry = true;

      try {
        const response = await axios.post("/auth/refresh", {
          refreshToken: sessionStorage.getItem("refreshToken"),
        });

        const { accessToken } = response.data;
        const tokenExpiration = add(new Date(), { hours: 1 });

        sessionStorage.setItem("tokenExpiration", `${tokenExpiration}`);
        sessionStorage.setItem("token", accessToken);

        return axios(originalConfig);
      } catch (_error) {
        invalidateTokenSession();
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  },
);

export default api;
