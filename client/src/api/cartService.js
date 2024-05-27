// client/src/api/cartService.js

import axiosInstance from "./axiosInstance";

const cartService = {
  fetchCart: async () => {
    const response = await axiosInstance.get("/api/cart");
    return response.data;
  },
  syncCart: async (cartItems) => {
    await axiosInstance.post("/api/cart/sync", { cartItems });
  },
  mergeCart: async (localCartItems) => {
    await axiosInstance.post("/api/cart/merge", { localCartItems });
  },
};

export default cartService;
