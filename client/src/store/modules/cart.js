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
      // Check if within buying window before adding to cart
      if (isWithinBuyingWindow()) {
        const productIndex = state.cartItems.findIndex(
          (item) => item.productId === productId
        );
        if (productIndex !== -1) {
          state.cartItems[productIndex].quantity += quantity;
        } else {
          state.cartItems.push({ productId, quantity });
        }
        // Recalculate shipping fee after modifying cart
        this.commit("cart/CALCULATE_SHIPPING_FEE");
      } else {
        // Handle the case when adding to cart is attempted outside the buying window
        console.error("Cannot add to cart outside the buying window.");
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );
      this.commit("cart/CALCULATE_SHIPPING_FEE");
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const item = state.cartItems.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      this.commit("cart/CALCULATE_SHIPPING_FEE");
    },
    CALCULATE_SHIPPING_FEE(state) {
      const totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      if (totalQuantity >= state.shippingInfo.freeShippingThreshold) {
        state.shippingInfo.currentShippingFee = 0;
      } else {
        state.shippingInfo.currentShippingFee =
          totalQuantity >= 11
            ? state.shippingInfo.extendedShippingFee
            : state.shippingInfo.baseShippingFee;
      }
    },
    // Other mutations...
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
      // Ensure checkout is only possible within the buying window
      if (isWithinBuyingWindow()) {
        commit("CHECKOUT_ORDER");
      } else {
        console.error("Cannot checkout outside the buying window.");
      }
    },
    addToCheckedOutOrder({ commit }, payload) {
      commit("ADD_TO_CHECKED_OUT_ORDER", payload);
    },
    // Additional actions...
  },
  getters: {
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

function isWithinBuyingWindow() {
  const now = new Date();
  const estOffset = -5 * 60; // EST offset
  const nowEst = new Date(
    now.getTime() + (estOffset - now.getTimezoneOffset()) * 60000
  );

  // Set endOfWeek to Sunday 7:59 AM
  const endOfWeek = new Date(nowEst);
  endOfWeek.setDate(nowEst.getDate() + (7 - nowEst.getDay())); // Next Sunday
  endOfWeek.setHours(7, 59, 0, 0); // 7:59 AM

  const startOfWeek = new Date(endOfWeek);
  startOfWeek.setDate(endOfWeek.getDate() - 7); // Previous Sunday
  startOfWeek.setHours(8, 0, 0, 0); // 8:00 AM

  return nowEst >= startOfWeek && nowEst < endOfWeek;
}
