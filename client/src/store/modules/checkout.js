// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/checkout.js

const state = {
  shippingDetails: {
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    hasApartment: false,
  },
  billingDetails: {
    cardholderName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    hasApartment: false,
  },
  isBillingSameAsShipping: false,
  shippingCompleted: false,
  billingCompleted: false,
};

const mutations = {
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
      state.billingDetails = {
        ...state.shippingDetails,
        cardholderName: `${state.shippingDetails.firstName} ${state.shippingDetails.lastName}`,
      };
    } else {
      state.billingDetails = {
        cardholderName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
        hasApartment: false,
      };
    }
  },
};

const actions = {
  updateDetail({ commit }, payload) {
    commit("UPDATE_DETAIL", payload);
  },
  linkBillingToShipping({ commit }, link) {
    commit("LINK_BILLING_TO_SHIPPING", link);
  },
};

const getters = {
  getShippingDetails: (state) => state.shippingDetails,
  getBillingDetails: (state) => state.billingDetails,
  isBillingSameAsShipping: (state) => state.isBillingSameAsShipping,
  shippingCompleted: (state) => state.shippingCompleted,
  billingCompleted: (state) => state.billingCompleted,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
