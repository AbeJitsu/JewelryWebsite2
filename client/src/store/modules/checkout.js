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
    showModal: false,
  },

  mutations: {
    UPDATE_DETAIL(state, { detailType, field, value }) {
      console.log("UPDATE_DETAIL mutation:", detailType, field, value);
      if (state[`${detailType}Details`]) {
        state[`${detailType}Details`][field] = value;
      }
    },
    LINK_BILLING_TO_SHIPPING(state, link) {
      console.log("LINK_BILLING_TO_SHIPPING mutation:", link);
      state.isBillingSameAsShipping = link;
      if (link) {
        state.billingDetails = { ...state.shippingDetails };
        state.billingDetails.cardholderName = `${state.shippingDetails.firstName} ${state.shippingDetails.lastName}`;
      }
    },
    SET_SHOW_MODAL(state, value) {
      state.showModal = value;
    },
  },
  actions: {
    updateDetail({ commit }, payload) {
      console.log("updateDetail action:", payload);
      commit("UPDATE_DETAIL", payload);
    },
    linkBillingToShipping({ commit }, link) {
      console.log("linkBillingToShipping action:", link);
      commit("LINK_BILLING_TO_SHIPPING", link);
    },
    handleAuthSuccess({ commit }) {
      commit("SET_SHOW_MODAL", false);
    },
  },
  getters: {
    getShippingDetails: (state) => state.shippingDetails,
    getBillingDetails: (state) => state.billingDetails,
    isBillingSameAsShipping: (state) => state.isBillingSameAsShipping,
  },
};
