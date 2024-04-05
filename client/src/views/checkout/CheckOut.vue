<template>
  <b-container class="checkout-component">
    <b-row>
      <b-col>
        <!-- AuthModal controlled by showModal property -->
        <auth-modal v-model="showModal" @auth-success="handleAuthSuccess" />

        <shipping-information />

        <billing-information />

        <payment-details />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AuthModal from "@/components/layout/AuthModal.vue";
import ShippingInformation from "./ShippingInformation.vue";
import BillingInformation from "./BillingInformation.vue";
import PaymentDetails from "./PaymentDetails.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

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
      billingSameAsShipping: (state) => state.checkout.billingSameAsShipping,
    }),
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
    }),
    showAuthModal() {
      return !this.isLoggedIn && this.showModal;
    },
  },
  // methods: {
  //   handleAuthSuccess() {
  //     // Possibly update Vuex state to reflect auth success
  //     this.$store.dispatch("checkout/authSuccess");
  //   },
  // },
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
