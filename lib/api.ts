import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { redirect } from "next/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      useAuthStore.getState().logout();
      redirect("/login");
    }
    return Promise.reject(error);
  },
);

export default api;
