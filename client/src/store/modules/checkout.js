// store/modules/checkout.js

export default {
  namespaced: true,

  state: {
    shippingDetails: {},
    billingDetails: {},
    paymentDetails: {},
    isBillingSameAsShipping: false, // Track if billing is same as shipping
  },

  mutations: {
    updateShippingDetails(state, details) {
      state.shippingDetails = details;
      // Synchronize billing details if necessary
      if (state.isBillingSameAsShipping) {
        state.billingDetails = { ...details };
      }
    },
    updateBillingDetails(state, details) {
      state.billingDetails = details;
    },
    updatePaymentDetails(state, details) {
      state.paymentDetails = details;
    },
    setBillingSameAsShipping(state, isSame) {
      state.isBillingSameAsShipping = isSame;
      if (isSame) {
        state.billingDetails = { ...state.shippingDetails };
      }
    },
  },

  actions: {
    setShippingDetails({ commit }, details) {
      commit("updateShippingDetails", details);
    },
    setBillingDetails({ commit }, details) {
      commit("updateBillingDetails", details);
    },
    setPaymentDetails({ commit }, details) {
      commit("updatePaymentDetails", details);
    },
    toggleBillingSameAsShipping({ commit }, isSame) {
      commit("setBillingSameAsShipping", isSame);
    },
  },

  getters: {
    getShippingDetails: (state) => state.shippingDetails,
    getBillingDetails: (state) => state.billingDetails,
    getPaymentDetails: (state) => state.paymentDetails,
    isBillingSameAsShipping: (state) => state.isBillingSameAsShipping,
  },
};
