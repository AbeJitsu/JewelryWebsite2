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
    shippingCompleted: false,
    billingCompleted: false,
  },

  mutations: {
    UPDATE_DETAIL(state, { detailType, field, value }) {
      if (field === "all") {
        state[`${detailType}Details`] = value;
        if (detailType === "shipping") {
          state.shippingCompleted = true;
        } else if (detailType === "billing") {
          state.billingCompleted = true;
        }
      } else {
        state[`${detailType}Details`][field] = value;
      }
    },
    LINK_BILLING_TO_SHIPPING(state, link) {
      state.isBillingSameAsShipping = link;
      if (link) {
        state.billingDetails = { ...state.shippingDetails };
        state.billingDetails.cardholderName = `${state.shippingDetails.firstName} ${state.shippingDetails.lastName}`;
      } else {
        // Optionally reset billing details if the link is removed
        state.billingDetails = {
          cardholderName: "",
          address: "",
          apartment: "",
          city: "",
          state: "",
          zip: "",
        };
      }
    },
  },
  actions: {
    updateDetail({ commit }, payload) {
      commit("UPDATE_DETAIL", payload);
    },
    linkBillingToShipping({ commit }, link) {
      commit("LINK_BILLING_TO_SHIPPING", link);
    },
  },
  getters: {
    getShippingDetails: (state) => state.shippingDetails,
    getBillingDetails: (state) => state.billingDetails,
    isBillingSameAsShipping: (state) => state.isBillingSameAsShipping,
    shippingCompleted: (state) => state.shippingCompleted,
    billingCompleted: (state) => state.billingCompleted,
  },
};
