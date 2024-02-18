// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/modal.js

export default {
  namespaced: true,
  state: {
    isModalOpen: false,
    selectedProductId: null,
  },
  mutations: {
    TOGGLE_MODAL(state, isVisible) {
      state.isModalOpen = isVisible;
    },
    SET_SELECTED_PRODUCT_ID(state, productId) {
      state.selectedProductId = productId;
    },
  },
  actions: {
    toggleModal({ commit }, isVisible) {
      commit("TOGGLE_MODAL", isVisible);
    },
    selectProductForQuickView({ commit, dispatch }, productId) {
      // Correctly dispatch to `product/setSelectedProduct` with namespacing
      dispatch("product/setSelectedProduct", productId, { root: true });
      commit("TOGGLE_MODAL", true);
    },
  },
  getters: {
    isModalOpen: (state) => state.isModalOpen,
    selectedProduct: (state, getters, rootState) => {
      // Adjusted to directly access the product from the product module's state
      return rootState.product.products.find(
        (product) => product._id === state.selectedProductId
      );
    },
  },
};
// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/modal.js
