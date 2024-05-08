<template>
  <b-container class="checkout-component">
    <b-row>
      <b-col>
        <!-- AuthModal controlled by showModal property -->
        <auth-modal v-model="showModal" @auth-success="handleAuthSuccess" />

        <shipping-information v-if="!isLoggedIn || !showModal" />

        <billing-information v-if="!isLoggedIn || !showModal" />

        <payment-details v-if="!isLoggedIn || !showModal" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AuthModal from "@/components/auth/AuthModal.vue";

import ShippingInformation from "./ShippingInformation.vue";
import BillingInformation from "./BillingInformation.vue";
import PaymentDetails from "./PaymentDetails.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    AuthModal,
    ShippingInformation,
    BillingInformation,
    PaymentDetails,
  },
  computed: {
    ...mapState({
      showModal: (state) => state.checkout.showModal,
    }),
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
    }),
    showAuthModal() {
      return !this.isLoggedIn && this.showModal;
    },
  },
  methods: {
    handleAuthSuccess() {
      // Handle what happens after a successful authentication
      this.$store.dispatch("checkout/handleAuthSuccess");
    },
  },
};
</script>

<style scoped>
.checkout-component {
  min-width: 40%;
  max-width: 50%;
  margin-top: 2rem;
}
</style>

<!-- Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/CheckOut.vue -->
