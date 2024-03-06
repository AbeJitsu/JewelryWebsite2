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
    ADD_TO_CART(state, { productId, quantity }) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );
      if (productIndex !== -1) {
        state.cartItems[productIndex].quantity += quantity;
      } else {
        state.cartItems.push({ productId, quantity });
      }
      // Recalculate shipping fee after modifying cart
      state.commit("cart/CALCULATE_SHIPPING_FEE");
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );
      state.commit("cart/CALCULATE_SHIPPING_FEE");
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const item = state.cartItems.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      state.commit("cart/CALCULATE_SHIPPING_FEE");
    },
    CALCULATE_SHIPPING_FEE(state) {
      const totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.shippingInfo.currentShippingFee =
        totalQuantity >= state.shippingInfo.freeShippingThreshold
          ? 0
          : totalQuantity >= 11
          ? state.shippingInfo.extendedShippingFee
          : state.shippingInfo.baseShippingFee;
    },
  },
  actions: {
    addToCart({ commit }, payload) {
      commit("ADD_TO_CART", payload);
    },
    removeFromCart({ commit }, productId) {
      commit("REMOVE_FROM_CART", productId);
    },
    updateQuantity({ commit }, payload) {
      commit("UPDATE_QUANTITY", payload);
    },
    checkoutOrder({ commit }) {
      commit("CHECKOUT_ORDER");
    },
    addToCheckedOutOrder({ commit }, payload) {
      commit("ADD_TO_CHECKED_OUT_ORDER", payload);
    },
  },
  getters: {
    isProductInCart: (state) => (productId) =>
      state.cartItems.some((item) => item.productId === productId),
    cartItems: (state) => state.cartItems,
    cartTotal: (state) =>
      state.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    itemCount: (state) =>
      state.cartItems.reduce((total, item) => total + item.quantity, 0),
    orderTotal: (state) => {
      const productsTotal = state.checkedOutOrders
        .flat()
        .reduce(
          (total, { product, quantity }) => total + product.price * quantity,
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
