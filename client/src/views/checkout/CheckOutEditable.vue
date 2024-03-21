<template>
  <b-container class="checkout-component">
    <b-row>
      <b-col>
        <!-- AuthModal controlled by showModal property -->
        <auth-modal
          v-model="showModal"
          @auth-success="handleAuthSuccess"
        ></auth-modal>

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

            <!-- Apartment/Suite Input (Optional) -->
            <b-form-group
              label="Apartment/Suite (Optional)"
              label-for="shipping-apartment"
            >
              <b-form-input
                id="shipping-apartment"
                v-model="$v.shippingDetails.apartment.$model"
                placeholder="Apartment, suite, etc. (Optional)"
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

        <!-- Checkbox to indicate if billing address is the same as shipping -->
        <b-form-checkbox v-model="billingSameAsShipping">
          Billing address is the same as shipping address
        </b-form-checkbox>

        <!-- Billing Information shown if billing address is not the same as shipping -->
        <div v-if="!billingSameAsShipping">
          <h2 class="section-title">Billing Information</h2>
          <div class="billing-info-container">
            <b-form @submit.prevent="onSubmitBilling">
              <!-- Billing Address Input -->
              <b-form-group label="Address" label-for="billing-address">
                <b-form-input
                  id="billing-address"
                  v-model="billingDetails.address"
                  required
                  placeholder="Enter your billing address"
                ></b-form-input>
              </b-form-group>

              <!-- Billing Apartment/Suite Input (Optional) -->
              <b-form-group
                label="Apartment/Suite (Optional)"
                label-for="billing-apartment"
              >
                <b-form-input
                  id="billing-apartment"
                  v-model="billingDetails.apartment"
                  placeholder="Apartment, suite, etc. (Optional)"
                ></b-form-input>
              </b-form-group>

              <!-- Billing City Input -->
              <b-form-group label="City" label-for="billing-city">
                <b-form-input
                  id="billing-city"
                  v-model="billingDetails.city"
                  required
                  placeholder="Enter your city"
                ></b-form-input>
              </b-form-group>

              <!-- Billing State Input -->
              <b-form-group label="State" label-for="billing-state">
                <b-form-input
                  id="billing-state"
                  v-model="billingDetails.state"
                  required
                  placeholder="Enter your state"
                ></b-form-input>
              </b-form-group>

              <!-- Billing ZIP Code Input -->
              <b-form-group label="ZIP Code" label-for="billing-zip">
                <b-form-input
                  id="billing-zip"
                  v-model="billingDetails.zip"
                  required
                  placeholder="Enter your ZIP code"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </div>
        </div>

        <!-- Payment Information -->
        <h2 class="section-title">Payment Details</h2>
        <div class="payment-info-container">
          <b-form @submit.prevent="onSubmitPayment">
            <!-- Card Number Input -->
            <b-form-group label="Card Number" label-for="card-number">
              <b-form-input
                id="card-number"
                v-model="paymentDetails.cardNumber"
                required
                placeholder="Enter your card number"
              ></b-form-input>
            </b-form-group>

            <!-- Expiration Date Input -->
            <b-form-group label="Expiration Date" label-for="expiration-date">
              <b-form-input
                id="expiration-date"
                v-model="paymentDetails.expirationDate"
                required
                placeholder="MM/YY"
              ></b-form-input>
            </b-form-group>

            <!-- CVV Input -->
            <b-form-group label="CVV" label-for="cvv">
              <b-form-input
                id="cvv"
                v-model="paymentDetails.cvv"
                required
                type="password"
                placeholder="CVV"
              ></b-form-input>
            </b-form-group>
          </b-form>
        </div>

        <!-- Proceed to Payment Button -->
        <b-button
          class="proceed-payment-button"
          @click="submitCheckout"
          :disabled="!canProceedToPayment"
          >Proceed to Payment</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import AuthModal from "@/components/layout/AuthModal.vue";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import Vue from "vue";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);

export default {
  components: {
    AuthModal,
  },
  mixins: [validationMixin],
  data() {
    return {
      showModal: false,
      billingSameAsShipping: false,
      shippingDetails: {
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
      },
      billingDetails: this.billingSameAsShipping
        ? this.shippingDetails
        : {
            address: "",
            apartment: "",
            city: "",
            state: "",
            zip: "",
          },
      paymentDetails: {
        cardNumber: "",
        expirationDate: "",
        cvv: "",
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
    billingDetails: {
      address: { required },
      city: { required },
      state: { required },
      zip: { required },
    },
    paymentDetails: {
      cardNumber: { required },
      expirationDate: { required },
      cvv: { required },
    },
  },
  methods: {
    handleAuthSuccess() {
      this.showModal = false;
    },
    onSubmitShipping() {
      this.$v.shippingDetails.$touch();
      if (!this.$v.shippingDetails.$invalid) {
        // Logic to handle shipping form submission
      }
    },
    onSubmitBilling() {
      this.$v.billingDetails.$touch();
      if (!this.$v.billingDetails.$invalid) {
        // Logic to handle billing form submission
      }
    },
    onSubmitPayment() {
      this.$v.paymentDetails.$touch();
      if (!this.$v.paymentDetails.$invalid) {
        // Logic to handle payment form submission
      }
    },
    submitCheckout() {
      this.onSubmitShipping();
      if (!this.billingSameAsShipping) {
        this.onSubmitBilling();
      }
      this.onSubmitPayment();
      // Additional final checkout submission logic here
    },
    getFieldState(field) {
      return field.$dirty ? !field.$error : null;
    },
  },
};
</script>
