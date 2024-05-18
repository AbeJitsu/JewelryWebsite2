// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/cart.js

import _ from "lodash";
import cartService from "@/api/cartService";

const CART_STORAGE_KEY = "cartItems";

const state = {
  cartItems: JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [],
  checkedOutOrders: [],
  shippingInfo: {
    baseShippingFee: 5,
    extendedShippingFee: 7,
    freeShippingThreshold: 100,
    currentShippingFee: 0,
  },
  taxRate: 0.065,
  postLoginRedirect: null,
  syncErrors: 0,
  syncInProgress: false,
};

const mutations = {
  ADD_TO_CART(state, { product, quantity }) {
    const productIndex = state.cartItems.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex !== -1) {
      state.cartItems[productIndex].quantity += quantity;
    } else {
      state.cartItems.push({ product, quantity });
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cartItems));
  },
  REMOVE_FROM_CART(state, productId) {
    state.cartItems = state.cartItems.filter(
      (item) => item.product._id !== productId
    );
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cartItems));
  },
  UPDATE_QUANTITY(state, { productId, quantity }) {
    const item = state.cartItems.find((item) => item.product._id === productId);
    if (item) {
      item.quantity = quantity;
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cartItems));
  },
  SET_CART_ITEMS(state, items) {
    state.cartItems = items;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cartItems));
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
  SET_POST_LOGIN_REDIRECT(state, redirectPath) {
    state.postLoginRedirect = redirectPath;
  },
};

const actions = {
  async fetchCart({ commit }) {
    try {
      const response = await cartService.fetchCart();
      commit("SET_CART_ITEMS", response.data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  },
  addToCart({ commit, dispatch }, { product, quantity }) {
    commit("ADD_TO_CART", { product, quantity });
    dispatch("syncCart");
  },
  removeFromCart({ commit, dispatch }, productId) {
    commit("REMOVE_FROM_CART", productId);
    dispatch("syncCart");
  },
  updateQuantity({ commit, dispatch }, { productId, quantity }) {
    commit("UPDATE_QUANTITY", { productId, quantity });
    dispatch("syncCart");
  },
  syncCart: _.debounce(async ({ state, commit }) => {
    if (state.syncInProgress) return;
    commit("SYNC_IN_PROGRESS", true);
    try {
      await cartService.syncCart(state.cartItems);
      commit("RESET_SYNC_ERRORS");
    } catch (error) {
      commit("INCREMENT_SYNC_ERRORS");
      console.error("Failed to sync cart with server:", error);
    } finally {
      commit("SYNC_IN_PROGRESS", false);
    }
  }, 2000),
};

const getters = {
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
    const { baseShippingFee, extendedShippingFee, freeShippingThreshold } =
      state.shippingInfo;

    console.log(`productsTotal: ${productsTotal}`);
    console.log(`freeShippingThreshold: ${freeShippingThreshold}`);
    console.log(`extendedShippingFee: ${extendedShippingFee}`);
    console.log(`baseShippingFee: ${baseShippingFee}`);

    if (productsTotal >= freeShippingThreshold) {
      return 0;
    } else if (productsTotal > 50) {
      return extendedShippingFee;
    } else {
      return baseShippingFee;
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
