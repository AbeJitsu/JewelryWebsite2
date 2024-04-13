// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/checkout.js

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
    UPDATE_DETAIL(state, { detailType, field, value }) {
      if (state[`${detailType}Details`]) {
        state[`${detailType}Details`][field] = value;
      }
    },
    LINK_BILLING_TO_SHIPPING(state, link) {
      state.isBillingSameAsShipping = link;
      if (link) {
        // Copy shipping details to billing details
        state.billingDetails = { ...state.shippingDetails };
        // Additional field if needed
        state.billingDetails.cardholderName = `${state.shippingDetails.firstName} ${state.shippingDetails.lastName}`;
      }
    },
  },
  actions: {
    updateDetail({ commit }, payload) {
      commit("UPDATE_DETAIL", payload);
    },
    linkBillingToShipping({ commit }, link) {
      // Removed 'state' since it is not used
      commit("LINK_BILLING_TO_SHIPPING", link);
    },
  },
  getters: {
    getShippingDetails: (state) => state.shippingDetails,
    getBillingDetails: (state) => state.billingDetails,
    isBillingSameAsShipping: (state) => state.isBillingSameAsShipping,
  },
};
