// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/services/productService.js

const axios = require("axios");

// This assumes you have an environment variable set for the base URL
const API_URL = process.env.SERVER_API_URL || "http://localhost:3000";

const uploadCSVFiles = async (formData) => {
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

module.exports = {
  uploadCSVFiles,
};
