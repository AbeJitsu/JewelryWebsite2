// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/api/axiosInstance.js

// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/api/authService.js

import axiosInstance from "./axiosInstance";

const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }
    return response.data;
  },
  logout: async () => {
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  },
  tryAutoLogin: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      const response = await axiosInstance.get("/auth/user");
      return response.data;
    }
  },
};

export default authService;
