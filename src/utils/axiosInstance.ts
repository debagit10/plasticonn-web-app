// api.ts
import axios from "axios";
import { useAuthStore } from "./useAuth";
import { navigateRef } from "./navigationRef";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_BASE_URL_PROD
      : import.meta.env.VITE_BASE_URL_DEV,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      useAuthStore.getState().clearUser();
      console.log("navigateRef is:", navigateRef); // <-- add this

      navigateRef?.("/join");
    }
    return Promise.reject(error);
  },
);

export default api;
