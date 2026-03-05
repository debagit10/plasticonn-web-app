import axios from "axios";
//import NProgress from "nprogress";
import { useAuthStore } from "./useAuth";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_DEV,
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
  (response) => {
    //NProgress.done();
    return response;
  },
  (error) => {
    // NProgress.done();

    if (error.response?.status === 401) {
      useAuthStore.getState().clearUser();
      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

export default api;
