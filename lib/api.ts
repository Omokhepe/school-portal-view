import axios from "axios";
import { toast } from "sonner";
// import Router from "next/router";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      if (typeof window !== "undefined") {
        toast.error("Session expired. Please Log in Again");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
