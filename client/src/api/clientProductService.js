// /Users/abiezerreyes/Documents/JewelryWebsite2/client/src/api/clientProductService.js

import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export const uploadCSVFiles = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/upload-csv`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading CSV files:", error);
    throw error;
  }
};
