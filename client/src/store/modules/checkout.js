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
    // General mutation to update any field in the state
    updateField(state, { path, value }) {
      const fields = path.split(".");
      const lastField = fields.pop();
      const lastState = fields.reduce(
        (currentState, field) => currentState[field],
        state
      );
      lastState[lastField] = value;
    },
  },

  actions: {
    // General action to commit updates to any field
    updateField({ commit }, payload) {
      commit("updateField", payload);
    },

    // Specific actions can still be maintained for complex logic
    toggleBillingSameAsShipping({ commit, state }, isSame) {
      commit("updateField", { path: "isBillingSameAsShipping", value: isSame });
      if (isSame) {
        for (const key in state.shippingDetails) {
          commit("updateField", {
            path: `billingDetails.${key}`,
            value: state.shippingDetails[key],
          });
        }
        // Maintain the cardholder name if it was already set
        commit("updateField", {
          path: "billingDetails.cardholderName",
          value:
            state.billingDetails.cardholderName ||
            `${state.shippingDetails.firstName} ${state.shippingDetails.lastName}`,
        });
      }
    },
  },

  getters: {
    getShippingDetails: (state) => state.shippingDetails,
    getBillingDetails: (state) => state.billingDetails,
    getPaymentDetails: (state) => state.paymentDetails,
    isBillingSameAsShipping: (state) => state.isBillingSameAsShipping,
  },
};
