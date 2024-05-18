// /Users/abiezerreyes/Documents/JewelryWebsite2/client/src/api/cartService.js

import axios from "axios";

export default {
  fetchCart() {
    return axios.get("/api/cart");
  },
  syncCart(cartItems) {
    return axios.post("/api/cart/sync", { cartItems });
  },
};
