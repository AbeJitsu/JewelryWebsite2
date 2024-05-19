// /Users/abiezerreyes/Documents/JewelryWebsite2/client/src/api/cartService.js

import axios from "axios";

const cartService = {
  async fetchCart() {
    try {
      const response = await axios.get("/api/cart");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      throw error;
    }
  },
  async syncCart(cartItems) {
    try {
      await axios.post("/api/cart/sync", { items: cartItems });
    } catch (error) {
      console.error("Failed to sync cart:", error);
      throw error;
    }
  },
};

export default cartService;
