<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/AddressConfirmation.vue -->

<template>
  <div class="address-confirmation-container">
    <h3 class="section-title">Please confirm your addresses</h3>
    <div class="address">
      <h5>Shipping Address</h5>
      <p>{{ formattedShippingAddress }}</p>
    </div>
    <div class="address">
      <h4>Billing Address</h4>
      <p>{{ formattedBillingAddress }}</p>
    </div>
    <div class="button-group">
      <b-button
        @click="goBackToEdit"
        variant="secondary"
        class="secondary-button"
      >
        Edit Addresses
      </b-button>
      <b-button
        @click="confirmAddresses"
        variant="primary"
        class="primary-button"
      >
        Confirm
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("checkout", ["shippingDetails", "billingDetails"]),
    formattedShippingAddress() {
      const { firstName, lastName, address, apartment, city, state, zip } =
        this.shippingDetails;
      return `${firstName} ${lastName}\n${address}\n${
        apartment ? "" + apartment + "\n" : ""
      }${city}, ${state} ${zip}`;
    },
    formattedBillingAddress() {
      const { cardholderName, address, apartment, city, state, zip } =
        this.billingDetails;
      return `${cardholderName}\n${address}\n${
        apartment ? "" + apartment + "\n" : ""
      }${city}, ${state} ${zip}`;
    },
  },
  methods: {
    ...mapActions("checkout", ["confirmAddresses"]),
    confirmAddresses() {
      this.confirmAddresses();
      this.$emit("confirm"); // Emit the confirm event
    },
    goBackToEdit() {
      this.$router.push({ name: "checkout-billing" });
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/sharedStyles.scss";

.section-title {
  margin-bottom: 2.5rem;
}

.address p {
  white-space: pre-line;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>
