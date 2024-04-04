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
    // Mutations for shipping details
    setShippingFirstName(state, firstName) {
      state.shippingDetails.firstName = firstName;
    },
    setShippingLastName(state, lastName) {
      state.shippingDetails.lastName = lastName;
    },
    setShippingAddress(state, address) {
      state.shippingDetails.address = address;
    },
    setShippingApartment(state, apartment) {
      state.shippingDetails.apartment = apartment;
    },
    setShippingCity(state, city) {
      state.shippingDetails.city = city;
    },
    setShippingState(state, stateName) {
      state.shippingDetails.state = stateName;
    },
    setShippingZip(state, zip) {
      state.shippingDetails.zip = zip;
    },

    // Mutations for billing details
    setBillingCardholderName(state, name) {
      state.billingDetails.cardholderName = name;
    },
    setBillingAddress(state, address) {
      state.billingDetails.address = address;
    },
    setBillingApartment(state, apartment) {
      state.billingDetails.apartment = apartment;
    },
    setBillingCity(state, city) {
      state.billingDetails.city = city;
    },
    setBillingState(state, stateName) {
      state.billingDetails.state = stateName;
    },
    setBillingZip(state, zip) {
      state.billingDetails.zip = zip;
    },

    // Mutation to link billing and shipping
    linkBillingToShipping(state, link) {
      state.isBillingSameAsShipping = link;
      if (link) {
        state.billingDetails = { ...state.shippingDetails };
      }
    },
  },

  actions: {
    // Actions for shipping details
    updateShippingFirstName({ commit }, firstName) {
      commit("checkout/setShippingFirstName", firstName);
    },
    updateShippingLastName({ commit }, lastName) {
      commit("checkout/setShippingLastName", lastName);
    },
    updateShippingAddress({ commit }, address) {
      commit("checkout/setShippingAddress", address);
    },
    updateShippingApartment({ commit }, apartment) {
      commit("checkout/setShippingApartment", apartment);
    },
    updateShippingCity({ commit }, city) {
      commit("checkout/setShippingCity", city);
    },
    updateShippingState({ commit }, state) {
      commit("checkout/setShippingState", state);
    },
    updateShippingZip({ commit }, zip) {
      commit("checkout/setShippingZip", zip);
    },

    // Actions for billing details
    updateBillingCardholderName({ commit }, name) {
      commit("checkout/setBillingCardholderName", name);
    },
    updateBillingAddress({ commit }, address) {
      commit("checkout/setBillingAddress", address);
    },
    updateBillingApartment({ commit }, apartment) {
      commit("checkout/setBillingApartment", apartment);
    },
    updateBillingCity({ commit }, city) {
      commit("checkout/setBillingCity", city);
    },
    updateBillingState({ commit }, state) {
      commit("checkout/setBillingState", state);
    },
    updateBillingZip({ commit }, zip) {
      commit("checkout/setBillingZip", zip);
    },

    linkBillingToShipping({ commit }, link) {
      commit("checkout/linkBillingToShipping", link);
    },
  },

  getters: {
    getShippingDetails: (state) => state.shippingDetails,
    getBillingDetails: (state) => state.billingDetails,
    getPaymentDetails: (state) => state.paymentDetails,
    isBillingSameAsShipping: (state) => state.isBillingSameAsShipping,
  },
};
