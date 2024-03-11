// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/cart.js

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
      this.commit("cart/CALCULATE_SHIPPING_FEE");
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== productId
      );
      this.commit("cart/CALCULATE_SHIPPING_FEE");
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const item = state.cartItems.find(
        (item) => item.product._id === productId
      );
      if (item) {
        item.quantity = quantity;
      }
      this.commit("cart/CALCULATE_SHIPPING_FEE");
    },
    CALCULATE_SHIPPING_FEE(state) {
      const totalQuantity = state.cartItems.reduce((total, item) => {
        const itemQuantity =
          item.product.variantPrice === 20 ? item.quantity * 4 : item.quantity;
        return total + itemQuantity;
      }, 0);

      if (totalQuantity >= 20) {
        state.shippingInfo.currentShippingFee = 0;
      } else if (totalQuantity <= 10) {
        state.shippingInfo.currentShippingFee =
          state.shippingInfo.baseShippingFee;
      } else {
        state.shippingInfo.currentShippingFee =
          state.shippingInfo.extendedShippingFee;
      }
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
    orderTotal: (state) => {
      const productsTotal = state.cartItems.reduce(
        (total, item) =>
          total + item.product.variantPrice * parseInt(item.quantity, 10),
        0
      );
      const tax = productsTotal * state.taxRate;
      return {
        productsTotal,
        tax,
        total: productsTotal + tax + state.shippingInfo.currentShippingFee,
      };
    },
  },
};
