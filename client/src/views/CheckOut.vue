<template>
  <b-container class="checkout-component">
    <b-row>
      <b-col>
        <!-- AuthModal controlled by showModal property -->
        <auth-modal
          v-model="showModal"
          @auth-success="handleAuthSuccess"
        ></auth-modal>

        <!-- Billing and Shipping Information shown if the user is logged in -->
        <div v-if="isLoggedIn">
          <!-- Billing Information -->
          <h2 class="section-title">Billing Information</h2>
          <div class="billing-info-container">
            <b-form @submit.prevent="onSubmitBilling">
              <!-- Billing form inputs should be added here -->
            </b-form>
          </div>

          <!-- Shipping Information -->
          <h2 class="section-title">Shipping Information</h2>
          <div class="shipping-details-container">
            <b-form @submit.prevent="onSubmitShipping">
              <!-- Address Input -->
              <b-form-group
                label="Address"
                label-for="shipping-address"
                :state="getFieldState($v.shippingDetails.address)"
                invalid-feedback="Address is required"
              >
                <b-form-input
                  id="shipping-address"
                  v-model="$v.shippingDetails.address.$model"
                  :state="getFieldState($v.shippingDetails.address)"
                  required
                  placeholder="Enter your shipping address"
                ></b-form-input>
              </b-form-group>

              <!-- City Input -->
              <b-form-group
                label="City"
                label-for="shipping-city"
                :state="getFieldState($v.shippingDetails.city)"
                invalid-feedback="City is required"
              >
                <b-form-input
                  id="shipping-city"
                  v-model="$v.shippingDetails.city.$model"
                  :state="getFieldState($v.shippingDetails.city)"
                  required
                  placeholder="Enter your city"
                ></b-form-input>
              </b-form-group>

              <!-- State Input -->
              <b-form-group
                label="State"
                label-for="shipping-state"
                :state="getFieldState($v.shippingDetails.state)"
                invalid-feedback="State is required"
              >
                <b-form-input
                  id="shipping-state"
                  v-model="$v.shippingDetails.state.$model"
                  :state="getFieldState($v.shippingDetails.state)"
                  required
                  placeholder="Enter your state"
                ></b-form-input>
              </b-form-group>

              <!-- ZIP Code Input -->
              <b-form-group
                label="ZIP Code"
                label-for="shipping-zip"
                :state="getFieldState($v.shippingDetails.zip)"
                invalid-feedback="ZIP code is required"
              >
                <b-form-input
                  id="shipping-zip"
                  v-model="$v.shippingDetails.zip.$model"
                  :state="getFieldState($v.shippingDetails.zip)"
                  required
                  placeholder="Enter your ZIP code"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </div>

          <!-- Payment Information -->
          <h2 class="section-title">Payment Details</h2>
          <div class="payment-info-container">
            <b-form @submit.prevent="onSubmitPayment">
              <!-- Payment form inputs should be added here -->
            </b-form>
          </div>

          <!-- Proceed to Payment Button -->
          <b-button class="proceed-payment-button" @click="submitCheckout">
            Proceed to Payment
          </b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AuthModal from "@/components/layout/AuthModal.vue";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { mapGetters } from "vuex";

export default {
  components: {
    AuthModal,
  },
  mixins: [validationMixin],
  data() {
    return {
      showModal: false,
      shippingDetails: {
        address: "",
        city: "",
        state: "",
        zip: "",
      },
    };
  },
  validations: {
    shippingDetails: {
      address: { required },
      city: { required },
      state: { required },
      zip: { required },
    },
  },
  computed: {
    ...mapGetters("user", ["isLoggedIn"]),
    ...mapGetters("cart", ["itemCount"]),
  },
  methods: {
    showAuthModal() {
      this.showModal = true;
    },
    handleAuthSuccess() {
      this.showModal = false;
    },
    checkAuthentication() {
      if (!this.isLoggedIn) {
        this.showAuthModal();
      }
    },
    onSubmitBilling() {
      this.checkAuthentication();
      // Billing form submission logic goes here
    },
    onSubmitShipping() {
      this.checkAuthentication();
      this.$v.shippingDetails.$touch();
      // Shipping form submission logic goes here
    },
    onSubmitPayment() {
      this.checkAuthentication();
      // Payment form submission logic goes here
    },
    submitCheckout() {
      this.checkAuthentication();
      // Checkout submission logic goes here
    },
    getFieldState(field) {
      return field.$dirty ? !field.$error : null;
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
  margin-bottom: 20px;
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
  border: 1px solid #ccc;
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
