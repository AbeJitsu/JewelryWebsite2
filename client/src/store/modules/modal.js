// store/modules/modal.js

export default {
  namespaced: true, // Using namespaced for better modularity
  state: {
    isModalOpen: false,
    selectedProductId: null, // Tracks the selected product by its ID
  },
  mutations: {
    TOGGLE_MODAL(state, isVisible) {
      state.isModalOpen = isVisible; // Toggles modal visibility
    },
    SET_SELECTED_PRODUCT_ID(state, productId) {
      state.selectedProductId = productId; // Sets the selected product ID
    },
  },
  actions: {
    toggleModal({ commit }, isVisible) {
      commit("TOGGLE_MODAL", isVisible); // Action to toggle modal visibility
    },
    selectProductForQuickView({ commit }, productId) {
      // Action to set selected product ID and open the modal
      commit("SET_SELECTED_PRODUCT_ID", productId);
      commit("TOGGLE_MODAL", true); // Opens the modal after setting the product ID
    },
  },
  getters: {
    isModalOpen(state) {
      return state.isModalOpen; // Returns the modal's visibility state
    },
    selectedProductId(state) {
      return state.selectedProductId; // Returns the selected product ID
    },
    selectedProduct(state, getters, rootState, rootGetters) {
      // Optionally, a getter to return the selected product details
      // Ensure your product module and root getters are correctly set up to support this
      return rootGetters["product/getProductById"](state.selectedProductId);
    },
  },
};
