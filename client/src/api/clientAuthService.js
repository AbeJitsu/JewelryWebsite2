// client/src/api/clientAuthService.js

import axiosInstance from "./axiosInstance";

const clientAuthService = {
  login: async (email, password) => {
    try {
      console.log("Attempting to login with:", { email, password });
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      console.log("Login response:", response);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        // await store.dispatch("cart/mergeCartAfterLogin");
      }
      return response.data;
    } catch (error) {
      console.error("Error during login:", error.response || error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await axiosInstance.post("/api/auth/logout");
      console.log("Logout response:", response);
      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Error during logout:", error.response || error);
      throw error;
    }
  },
  tryAutoLogin: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        const response = await axiosInstance.get("/api/auth/user");
        console.log("Auto login response:", response);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error during auto login:", error.response || error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log("Attempting to register with:", userData);
      const response = await axiosInstance.post("/api/auth/register", userData);
      console.log("Register response:", response);
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response || error);
      throw error;
    }
  },
};

export default clientAuthService;
