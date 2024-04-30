// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/cart.js
import axios from "axios";
import _ from "lodash"; // Assuming lodash is installed for debouncing

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
    SYNC_IN_PROGRESS(state, inProgress) {
      state.syncInProgress = inProgress;
    },
    RESET_SYNC_ERRORS(state) {
      state.syncErrors = 0;
    },
    INCREMENT_SYNC_ERRORS(state) {
      state.syncErrors++;
    },
  },
  actions: {
    addToCart({ commit }, { product, quantity }) {
      commit("ADD_TO_CART", { product, quantity });
    },
    removeFromCart({ commit }, productId) {
      commit("REMOVE_FROM_CART", productId);
    },
    updateQuantity({ commit }, { productId, quantity }) {
      commit("UPDATE_QUANTITY", { productId, quantity });
    },
    syncCart: _.debounce(({ state, commit }) => {
      if (state.syncInProgress) return; // Prevent overlapping sync attempts

      commit("SYNC_IN_PROGRESS", true);
      axios
        .post("/api/cart", { cartItems: state.cartItems })
        .then(() => {
          commit("RESET_SYNC_ERRORS");
          console.info("Cart synced successfully.");
        })
        .catch((error) => {
          console.error("Failed to sync cart with server:", error);
          commit("INCREMENT_SYNC_ERRORS");
        })
        .finally(() => {
          commit("SYNC_IN_PROGRESS", false);
        });
    }, 2000), // Debouncing the sync operation to every 2 seconds
  },
  getters: {
    isProductInCart: (state) => (productId) => {
      return state.cartItems.some((item) => item.product._id === productId);
    },
    cartItems: (state) => state.cartItems,
    cartTotal: (state) => {
      return state.cartItems.reduce(
        (total, item) => total + item.product.variantPrice * item.quantity,
        0
      );
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
      const tax = Math.round(rawTax * 100) / 100;
      const shippingFee = getters.currentShippingFee;
      const total = productsTotal + tax + shippingFee;
      const roundedTotal = Math.round(total * 100) / 100;
      return {
        productsTotal: Math.round(productsTotal * 100) / 100,
        tax,
        total: roundedTotal,
      };
    },
  },
};
