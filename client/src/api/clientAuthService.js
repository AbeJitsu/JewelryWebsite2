// client/src/api/clientAuthService.js

// Client-side authentication service using axios to communicate with the server.

import axiosInstance from "./axiosInstance";
import store from "@/store";

const clientAuthService = {
  login: async (email, password) => {
    console.log("Making login request to /api/auth/login with email:", email);
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    console.log("Login request response:", response);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
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

export default clientAuthService;
