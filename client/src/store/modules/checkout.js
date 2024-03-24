// store/modules/checkout.js

export default {
  namespaced: true,

  state: {
    shippingDetails: {},
    billingDetails: {},
    paymentDetails: {},
  },

  mutations: {
    updateShippingDetails(state, details) {
      state.shippingDetails = details;
    },
    updateBillingDetails(state, details) {
      state.billingDetails = details;
    },
    updatePaymentDetails(state, details) {
      state.paymentDetails = details;
    },
  },

  actions: {
    // You can also use actions to handle asynchronous operations or complex logic
    setShippingDetails({ commit }, details) {
      commit("updateShippingDetails", details);
    },
    setBillingDetails({ commit }, details) {
      commit("updateBillingDetails", details);
    },
    setPaymentDetails({ commit }, details) {
      commit("updatePaymentDetails", details);
    },
  },

  getters: {
    // Getters to retrieve state data
    getShippingDetails: (state) => state.shippingDetails,
    getBillingDetails: (state) => state.billingDetails,
    getPaymentDetails: (state) => state.paymentDetails,
  },
};
