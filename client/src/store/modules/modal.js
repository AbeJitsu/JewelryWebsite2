// store/modules/modal.js
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
      commit("SET_SELECTED_PRODUCT_ID", productId);
      commit("TOGGLE_MODAL", true);
      // Dispatch an action to the product module to update the selectedProduct based on productId
      // Note: Ensure that the 'product/selectProduct' action is defined and properly handles setting the selected product
      dispatch("product/selectProduct", productId, { root: true });
    },
  },
  getters: {
    isModalOpen(state) {
      return state.isModalOpen;
    },
    selectedProductId(state) {
      return state.selectedProductId;
    },
    selectedProduct(state, getters, rootState, rootGetters) {
      // Ensure this getter fetches the product details from the product module based on the selectedProductId
      return rootGetters["product/getProductById"](state.selectedProductId);
    },
  },
};
