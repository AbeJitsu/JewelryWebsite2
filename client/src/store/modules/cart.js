// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/cart.js
import axios from "axios";

export default {
  namespaced: true,
  state: {
    cartItems: [],
    checkedOutOrders: [],
    shippingInfo: {
      baseShippingFee: 5,
      extendedShippingFee: 7,
      freeShippingThreshold: 20,
      currentShippingFee: 0,
    },
    taxRate: 0.065,
    postLoginRedirect: null,
    syncErrors: 0,
    syncInProgress: false,
  },
  mutations: {
    ADD_TO_CART(state, { product, quantity }) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.product._id === product._id
      );
      if (productIndex !== -1) {
        state.cartItems[productIndex].quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== productId
      );
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const item = state.cartItems.find(
        (item) => item.product._id === productId
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    SET_POST_LOGIN_REDIRECT(state, redirect) {
      state.postLoginRedirect = redirect;
    },
  },
  actions: {
    async addToCart({ commit, dispatch }, { product, quantity }) {
      commit("ADD_TO_CART", { product, quantity });
      await dispatch("syncCart");
    },
    async removeFromCart({ commit, dispatch }, productId) {
      commit("REMOVE_FROM_CART", productId);
      await dispatch("syncCart");
    },
    async updateQuantity({ commit, dispatch }, { productId, quantity }) {
      commit("UPDATE_QUANTITY", { productId, quantity });
      await dispatch("syncCart");
    },
    async syncCart({ state, commit, dispatch }) {
      if (state.syncInProgress) return; // Prevent overlapping sync attempts

      commit('SYNC_IN_PROGRESS', true);
      try {
        await axios.post("/api/cart", { cartItems: state.cartItems });
        commit('RESET_SYNC_ERRORS');
        console.info("Cart synced successfully.");
      } catch (error) {
        console.error("Failed to sync cart with server:", error);
        commit('INCREMENT_SYNC_ERRORS');
        if (state.syncErrors < 3) { // Retry up to 3 times
          setTimeout(() => dispatch('syncCart'), 2000 * Math.pow(2, state.syncErrors)); // Exponential back-off
        } else {
          alert("Failed to sync cart: " + error.message); // Notify user after final attempt
        }
      } finally {
        commit('SYNC_IN_PROGRESS', false);
      }
    },
  },
  getters: {
    isProductInCart: (state) => (productId) => {
      return state.cartItems.some((item) => item.product._id === productId);
    },
    cartItems: (state) => state.cartItems,
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + item.product.variantPrice * item.quantity;
      }, 0);
    },
    itemCount: (state) => {
      return state.cartItems.reduce(
        (total, item) => total + parseInt(item.quantity, 10),
        0
      );
    },
    currentShippingFee: (state, getters) => {
      const productsTotal = getters.cartTotal;
      if (productsTotal >= 100) {
        return 0;
      } else if (productsTotal > 50 && productsTotal < 100) {
        return state.shippingInfo.extendedShippingFee;
      } else {
        return state.shippingInfo.baseShippingFee;
      }
    },
    orderTotal: (state, getters) => {
      const productsTotal = getters.cartTotal;
      const rawTax = productsTotal * state.taxRate;
      // Multiply by 100, use Math.ceil, then divide by 100 to keep two decimal places
      const tax = Math.round(rawTax * 100) / 100;
      const shippingFee = getters.currentShippingFee;
      const total = productsTotal + tax + shippingFee;

      // Use Math.ceil for the final total as well
      const roundedTotal = Math.round(total * 100) / 100;

      return {
        productsTotal: Math.round(productsTotal * 100) / 100, // Still rounding normally for total product cost
        tax,
        total: roundedTotal,
      };
    },
  },
};
