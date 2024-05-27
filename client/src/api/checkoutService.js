// client/src/api/checkoutService.js


import axiosInstance from "./axiosInstance";

const checkoutService = {
  processCheckout: async (cartItems) => {
    try {
      const response = await axiosInstance.post("/api/checkout", { cartItems });
      return response.data;
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error;
    }
  },
};

export default checkoutService;
