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
      console.log(`Adding product to cart:`, { product, quantity });
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
      console.log(`Removing product from cart: ${productId}`);
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== productId
      );
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      console.log(`Updating quantity for product ${productId} to ${quantity}`);
      const item = state.cartItems.find(
        (item) => item.product._id === productId
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    SET_CART_ITEMS(state, items) {
      state.cartItems = items;
    },
    SYNC_IN_PROGRESS(state, inProgress) {
      console.log(`Sync in progress: ${inProgress}`);
      state.syncInProgress = inProgress;
    },
    RESET_SYNC_ERRORS(state) {
      console.log("Resetting sync errors");
      state.syncErrors = 0;
    },
    INCREMENT_SYNC_ERRORS(state) {
      console.log("Incrementing sync errors");
      state.syncErrors++;
    },
    SET_POST_LOGIN_REDIRECT(state, path) {
      state.postLoginRedirect = path;
    },
  },
  actions: {
    async fetchCart({ commit }) {
      try {
        const response = await axios.get("/api/cart");
        commit("SET_CART_ITEMS", response.data.items || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    },
    addToCart({ commit, dispatch }, { product, quantity }) {
      console.log("Action: addToCart");
      commit("ADD_TO_CART", { product, quantity });
      dispatch("syncCart");
    },
    removeFromCart({ commit, dispatch }, productId) {
      console.log("Action: removeFromCart");
      commit("REMOVE_FROM_CART", productId);
      dispatch("syncCart");
    },
    updateQuantity({ commit, dispatch }, { productId, quantity }) {
      console.log("Action: updateQuantity");
      commit("UPDATE_QUANTITY", { productId, quantity });
      dispatch("syncCart");
    },
    syncCart: _.debounce(({ state, commit }) => {
      if (state.syncInProgress) return; // Prevent overlapping sync attempts
      console.log("Action: syncCart - Syncing cart to server", state.cartItems);

      commit("SYNC_IN_PROGRESS", true);
      axios
        .post("/api/cart/add", { cartItems: state.cartItems })
        .then((response) => {
          console.log("Sync successful:", response.data);
          commit("RESET_SYNC_ERRORS");
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
