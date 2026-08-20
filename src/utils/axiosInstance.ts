import axios from "axios";
//import NProgress from "nprogress";
import { useAuthStore } from "./useAuth";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const api = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_BASE_URL_PROD
      : import.meta.env.VITE_BASE_URL_DEV,
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    //NProgress.start();

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearUser();
      navigate("/join");
    }

    return Promise.reject(error);
  },
);
export default api;
