// store/modules/cart.js

export default {
  state: {
    cartItems: [], // Array to hold items in cart
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
  },
};
