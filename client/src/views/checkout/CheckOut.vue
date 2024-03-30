<template>
  <b-container class="checkout-component">
    <b-row>
      <b-col>
        <!-- AuthModal controlled by showModal property -->
        <auth-modal
          v-model="showModal"
          @auth-success="handleAuthSuccess"
        ></auth-modal>

        <!-- Include ShippingInformation component -->
        <shipping-information @update-shipping="handleShippingUpdate" />

        <!-- Include BillingInformation component -->
        <billing-information
          :isSameAsShipping="billingSameAsShipping"
          @update-billing="handleBillingUpdate"
        />

        <!-- Include PaymentDetails component -->
        <payment-details @update-payment="handlePaymentUpdate" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AuthModal from "@/components/layout/AuthModal.vue";
import ShippingInformation from "./ShippingInformation.vue";
import BillingInformation from "./BillingInformation.vue";
import PaymentDetails from "./PaymentDetails.vue";

export default {
  components: {
    AuthModal,
    ShippingInformation,
    BillingInformation,
    PaymentDetails,
  },
  data() {
    return {
      showModal: false,
      billingSameAsShipping: false,
    };
  },
  methods: {
    handleAuthSuccess() {
      this.showModal = false;
    },
    handleShippingUpdate() {
      // Handle shipping data update
    },
    handleBillingUpdate() {
      // Handle billing data update
    },
    handlePaymentUpdate() {
      // Handle payment data update
    },
    submitCheckout() {
      // Logic to submit the checkout data
    },
  },
};
</script>

<style scoped>
.checkout-component {
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
  background-color: #f8f9fa; /* Light grey background for each section for visual separation */
}

.review-order-container:hover,
.shipping-details-container:hover,
.billing-info-container:hover,
.payment-info-container:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.section-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem; /* Space between title and content */
}

/* Styling for form inputs, aligning with your cart item styling */
.input-field {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #000000;
  border-radius: 0.25rem;
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

./CheckOut.vue
