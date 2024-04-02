// store/modules/checkout.js

export default {
  namespaced: true,

  state: {
    shippingDetails: {
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
    },
    billingDetails: {
      cardholderName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
    },
    paymentDetails: {},
    isBillingSameAsShipping: false,
  },

  mutations: {
    updateShippingDetails(state, details) {
      state.shippingDetails = { ...details };
      if (state.isBillingSameAsShipping) {
        state.billingDetails = {
          ...state.shippingDetails,
          cardholderName: state.billingDetails.cardholderName,
        };
      }
    },
    updateBillingDetails(state, details) {
      state.billingDetails = { ...details };
    },
    updatePaymentDetails(state, details) {
      state.paymentDetails = details;
    },
    setBillingSameAsShipping(state, isSame) {
      state.isBillingSameAsShipping = isSame;
      if (isSame) {
        state.billingDetails = {
          ...state.shippingDetails,
          cardholderName: state.billingDetails.cardholderName,
        };
      } else {
        // Ensure billing details are independent when not linked to shipping
        state.billingDetails = { ...state.billingDetails };
      }
    },
    setCardholderNameSameAsShipping(state, isSame) {
      // Only update the name if isSame is true, otherwise, keep the existing name
      if (isSame) {
        state.billingDetails.cardholderName = `${state.shippingDetails.firstName} ${state.shippingDetails.lastName}`;
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
    toggleCardholderNameSameAsShipping({ commit }, isSame) {
      commit("setCardholderNameSameAsShipping", isSame);
    },
  },

  getters: {
    getShippingDetails: (state) => state.shippingDetails,
    getBillingDetails: (state) => state.billingDetails,
    getPaymentDetails: (state) => state.paymentDetails,
    isBillingSameAsShipping: (state) => state.isBillingSameAsShipping,
  },
};
