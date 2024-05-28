import axiosInstance from "./axiosInstance";

const checkoutService = {
  processCheckout: async ({ token, amount, currency }) => {
    try {
      const response = await axiosInstance.post("/api/payment", {
        token,
        amount,
        currency,
      });
      return response.data;
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error;
    }
  },
};

export default checkoutService;
