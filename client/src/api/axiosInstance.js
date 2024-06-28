// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/api/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
