// store/modules/cart.js

export default {
  state: {
    cartItems: [],
    checkedOutOrders: [],
    shippingInfo: {
      baseShippingFee: 5, // Base fee for 1-10 pieces
      extendedShippingFee: 7, // Fee for 11-19 pieces
      freeShippingThreshold: 20, // Free shipping for 20+ pieces
      currentShippingFee: 0, // Dynamically updated based on cart content
    },
    taxRate: 0.065, // 6.5% sales tax
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
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== productId
      );
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const cartItem = state.cartItems.find(
        (item) => item.product.id === productId
      );
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    CHECKOUT_ORDER(state) {
      // Move current cart items to checkedOutOrders and clear cartItems
      state.checkedOutOrders.push(...state.cartItems);
      state.cartItems = [];
      this.commit("CALCULATE_SHIPPING_FEE"); // Recalculate shipping fee for the new order state
    },
    ADD_TO_CHECKED_OUT_ORDER(state, { product, quantity }) {
      // Logic to add additional products to the last checked out order
      const order = state.checkedOutOrders[state.checkedOutOrders.length - 1];
      const existingProduct = order.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        order.push({ product, quantity });
      }
      this.commit("CALCULATE_SHIPPING_FEE"); // Recalculate shipping for updated order
    },
    CALCULATE_SHIPPING_FEE(state) {
      // Calculate shipping based on the current checkedOutOrders
      const totalPieces = state.checkedOutOrders
        .flat()
        .reduce((acc, { product, quantity }) => {
          const pieceCount = product.type === "fashion-fix" ? 4 : 1;
          return acc + pieceCount * quantity;
        }, 0);

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
    cartItems(state) {
      return state.cartItems;
    },
    cartTotal(state) {
      return state.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
    itemCount(state) {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    orderTotal: (state) => {
      const productsTotal = state.checkedOutOrders
        .flat()
        .reduce((total, { product, quantity }) => {
          return total + product.price * quantity;
        }, 0);
      const tax = productsTotal * state.taxRate;
      const total = productsTotal + tax + state.shippingInfo.currentShippingFee;
      return { productsTotal, tax, total };
    },
  },
};
// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/cart.js
