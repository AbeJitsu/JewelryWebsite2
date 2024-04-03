<template>
  <div>
    <!-- Billing Information Section -->
    <h2 class="section-title">Billing Information</h2>
    <div class="info-container">
      <b-form @submit.prevent="onSubmitBilling">
        <!-- Checkbox for Cardholder Name Same as Shipping Name -->
        <div>
          <div class="checkbox-align">
            <b-form-checkbox v-model="cardholderNameSameAsShipping">
              Same as shipping name
            </b-form-checkbox>
          </div>

          <!-- Name on Card Input -->
          <FormInput
            label="Name on Card"
            label-for="cardholder-name"
            placeholder="Enter cardholder's name"
            v-model="computedCardholderName"
            required
            :disabled="cardholderNameSameAsShipping"
          />
        </div>

        <!-- Billing Address Same as Shipping Address Checkbox -->
        <div class="checkbox-align">
          <b-form-checkbox v-model="billingSameAsShipping">
            Both addresses are the same
          </b-form-checkbox>
        </div>

        <!-- Conditional Rendering for Billing Address Inputs -->
        <template v-if="!billingSameAsShipping">
          <!-- Address Input -->
          <FormInput
            label="Address"
            label-for="billing-address"
            placeholder="Enter your billing address"
            v-model="billingDetails.address"
            required
          />

          <!-- Apartment/Suite Input -->
          <FormInput
            v-if="hasBillingApartment"
            label="Apartment/Suite"
            label-for="billing-apartment"
            placeholder="Apartment, suite, etc. (Optional)"
            v-model="billingDetails.apartment"
          />

          <!-- City Input -->
          <FormInput
            label="City"
            label-for="billing-city"
            placeholder="Enter your city"
            v-model="billingDetails.city"
            required
          />

          <!-- State Input -->
          <FormInput
            label="State"
            label-for="billing-state"
            placeholder="Enter your state"
            v-model="billingDetails.state"
            required
          />

          <!-- ZIP Code Input -->
          <FormInput
            label="ZIP Code"
            label-for="billing-zip"
            placeholder="Enter your ZIP code"
            v-model="billingDetails.zip"
            required
          />
        </template>
      </b-form>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/form/FormInput.vue";

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      billingSameAsShipping: false,
      cardholderNameSameAsShipping: false,
      hasBillingApartment: false,
      billingDetails: {
        cardholderName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
      },
      shippingDetails: this.$store.getters["checkout/getShippingDetails"],
    };
  },
  computed: {
    computedCardholderName() {
      return this.cardholderNameSameAsShipping
        ? `${this.shippingDetails.firstName} ${this.shippingDetails.lastName}`
        : this.billingDetails.cardholderName;
    },
  },
  watch: {
    billingSameAsShipping(newValue) {
      this.$store.dispatch("checkout/toggleBillingSameAsShipping", newValue);
      if (newValue) {
        this.billingDetails = {
          ...this.shippingDetails,
          cardholderName: this.billingDetails.cardholderName,
        };
      }
    },
    cardholderNameSameAsShipping(newValue) {
      if (newValue) {
        this.billingDetails.cardholderName = `${this.shippingDetails.firstName} ${this.shippingDetails.lastName}`;
      }
    },
  },
  methods: {
    onSubmitBilling() {
      this.$store.dispatch("checkout/setBillingDetails", this.billingDetails);
    },
  },
};
</script>

<style scoped>
@import "@/assets/sharedStyles.css";

/* .section-title {
  margin-bottom: 20px;
  margin-left: 20%;
  font-size: 24px;
  color: #333;
} */

.shipping-details-container,
.billing-info-container {
  background: #ffefef;
  border-radius: 1rem;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 2rem;
}

.form-group {
  margin: 1rem;
  white-space: nowrap;
}

.checkbox-align {
  margin-left: 33%; /* Adjust as needed for alignment */
}
</style>
/Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/BillingInformation.vue
