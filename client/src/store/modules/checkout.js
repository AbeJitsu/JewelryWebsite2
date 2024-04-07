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
    updateDetail(state, { detailType, field, value }) {
      if (detailType === "shipping" || detailType === "billing") {
        state[`${detailType}Details`][field] = value;
      }
    },

    linkBillingToShipping(state, link) {
      state.isBillingSameAsShipping = link;
      if (link) {
        state.billingDetails = { ...state.shippingDetails };
      }
    },
  },

  actions: {
    updateDetail({ commit }, payload) {
      commit("updateDetail", payload);
    },

    linkBillingToShipping({ commit }, link) {
      commit("linkBillingToShipping", link);
    },
  },

  getters: {
    getShippingDetails: (state) => state.shippingDetails,
    getBillingDetails: (state) => state.billingDetails,
    getPaymentDetails: (state) => state.paymentDetails,
    isBillingSameAsShipping: (state) => state.isBillingSameAsShipping,
  },
};
