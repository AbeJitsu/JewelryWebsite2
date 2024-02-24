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
      const existingProduct = state.cartItems.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }
      this.commit("CALCULATE_SHIPPING_FEE");
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== productId
      );
      this.commit("CALCULATE_SHIPPING_FEE");
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const cartItem = state.cartItems.find(
        (item) => item.product.id === productId
      );
      if (cartItem) {
        cartItem.quantity = quantity;
      }
      this.commit("CALCULATE_SHIPPING_FEE");
    },
    CHECKOUT_ORDER(state) {
      if (isWithinBuyingWindow()) {
        state.checkedOutOrders.push(...state.cartItems);
        state.cartItems = [];
        this.commit("CALCULATE_SHIPPING_FEE");
      } else {
        // As per requirements, this path is adjusted to reflect the continuous buying cycle.
        console.error(
          "Checkout is always within a valid window. Adjust flow accordingly."
        );
      }
    },
    ADD_TO_CHECKED_OUT_ORDER(state, { product, quantity }) {
      const order =
        state.checkedOutOrders[state.checkedOutOrders.length - 1] || [];
      const existingProduct = order.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        order.push({ product, quantity });
      }
      this.commit("CALCULATE_SHIPPING_FEE");
    },
    CALCULATE_SHIPPING_FEE(state) {
      const totalPieces = state.cartItems.reduce(
        (acc, { product, quantity }) =>
          acc + (product.type === "fashion-fix" ? 4 : 1) * quantity,
        0
      );
      if (totalPieces >= state.shippingInfo.freeShippingThreshold) {
        state.shippingInfo.currentShippingFee = 0;
      } else if (totalPieces >= 11) {
        state.shippingInfo.currentShippingFee =
          state.shippingInfo.extendedShippingFee;
      } else if (totalPieces > 0) {
        state.shippingInfo.currentShippingFee =
          state.shippingInfo.baseShippingFee;
      }
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

  // Convert now to EST, considering EST is UTC-5
  const estOffset = -5 * 60;
  const nowEst = new Date(
    now.getTime() + (estOffset - now.getTimezoneOffset()) * 60000
  );

  // Determine the upcoming Sunday 7:59 AM EST
  const endOfWeek = new Date(nowEst);
  endOfWeek.setDate(nowEst.getDate() + (7 - nowEst.getDay()));
  endOfWeek.setHours(7, 59, 0, 0);

  // Determine the start of the current buying window, which is the previous Sunday 8 AM EST
  const startOfWeek = new Date(endOfWeek);
  startOfWeek.setDate(endOfWeek.getDate() - 7);
  startOfWeek.setHours(8, 0, 0, 0);

  // Check if current EST time is within the buying window
  return nowEst >= startOfWeek && nowEst < endOfWeek;
}

// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/cart.js
