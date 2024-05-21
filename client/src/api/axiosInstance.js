// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/api/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

export default axiosInstance;
