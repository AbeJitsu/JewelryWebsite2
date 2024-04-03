<template>
  <b-container class="checkout-component">
    <b-row>
      <b-col>
        <!-- AuthModal controlled by showModal property -->
        <auth-modal v-model="showModal" @auth-success="handleAuthSuccess" />

        <!-- Include ShippingInformation component without passing props directly -->
        <shipping-information />

        <!-- Include BillingInformation component without passing props directly -->
        <billing-information />

        <!-- Include PaymentDetails component -->
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
  },
  methods: {
    handleAuthSuccess() {
      // Possibly update Vuex state to reflect auth success
      this.$store.dispatch("checkout/authSuccess");
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

.review-order-container,
.shipping-details-container,
.billing-info-container,
.payment-info-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
  background-color: hsl(208, 100%, 97%);
}

.review-order-container:hover,
.shipping-details-container:hover,
.billing-info-container:hover,
.payment-info-container:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Reuse button styles from the cart, with adjustments for checkout context */
.submit-order-button {
  background-color: #4caf50; /* A rich green for submission to indicate progress */
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 50rem;
}

.submit-order-button:hover {
  background-color: #43a047; /* Slightly darker green on hover */
  opacity: 0.9;
}

/* If you have a back button or other actions, you can style them similarly */
.back-button {
  background-color: #f76c6c; /* Soft red for actions like going back or canceling */
  color: white;
  /* Other button styles as needed */
}

.back-button:hover {
  background-color: #e76565;
  opacity: 0.9;
}

/* Additional styles for form elements like labels, select boxes, etc., can be added here */
</style>

<!-- Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/CheckOut.vue -->
