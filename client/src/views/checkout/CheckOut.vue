<template>
  <b-container class="checkout-component" v-if="isLoggedIn && hasItems">
    <!-- Display checkout information if logged in and cart has items -->
    <b-row>
      <b-col>
        <shipping-information />
        <billing-information />
        <payment-details />
      </b-col>
    </b-row>
  </b-container>
  <auth-modal v-else v-model="showModal" @auth-success="handleAuthSuccess" />
</template>

<script>
import AuthModal from "@/components/layout/AuthModal.vue";
import ShippingInformation from "./ShippingInformation.vue";
import BillingInformation from "./BillingInformation.vue";
import PaymentDetails from "./PaymentDetails.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AuthModal,
    ShippingInformation,
    BillingInformation,
    PaymentDetails,
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      hasItems: "cart/hasItems", // Ensure this getter is implemented
    }),
    showModal() {
      return !this.isLoggedIn || !this.hasItems;
    },
  },
  methods: {
    handleAuthSuccess() {
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
