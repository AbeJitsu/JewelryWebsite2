// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/modal.js

export default {
  namespaced: true,
  state: {
    isModalOpen: false,
    selectedProductId: null,
  },
  mutations: {
    TOGGLE_MODAL(state, isVisible) {
      console.log("TOGGLE_MODAL called with", isVisible);
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
    async selectProductForQuickView({ commit, dispatch }, productId) {
      // Fetch and set selected product
      await dispatch("product/setSelectedProduct", productId, { root: true });
      // Open the modal
      commit("TOGGLE_MODAL", true);
    },
  },
  getters: {
    isModalOpen: (state) => state.isModalOpen,
    selectedProduct: (state, getters, rootState) => {
      return rootState.product.selectedProduct;
    },
  },
};
