// client/src/api/authService.js

import axiosInstance from "./axiosInstance";
import store from "@/store";

const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      // Merge local cart with server cart
      await store.dispatch("cart/mergeCartAfterLogin");
    }
    return response.data;
  },
  logout: async () => {
    await axiosInstance.post("/api/auth/logout");
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  },
  tryAutoLogin: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      const response = await axiosInstance.get("/api/auth/user");
      return response.data;
    }
    return null;
  },
  register: async (userData) => {
    const response = await axiosInstance.post("/api/auth/register", userData);
    return response.data;
  },
};

export default authService;
