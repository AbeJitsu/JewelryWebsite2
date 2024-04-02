<template>
  <div>
    <!-- Billing Information Section -->
    <h2 class="section-title">Billing Information</h2>
    <div class="info-container">
      <b-form @submit.prevent="onSubmitBilling">
        <!-- Checkbox for Cardholder Name Same as Shipping Name -->
        <div class="checkbox-align">
          <b-form-checkbox v-model="cardholderNameSameAsShipping">
            Same name as shipping.
          </b-form-checkbox>
        </div>

        <FormInput
          label="Name on Card"
          label-for="cardholder-name"
          placeholder="Enter cardholder's name"
          v-model="billingDetails.cardholderName"
          required
          :disabled="cardholderNameSameAsShipping"
        />

        <!-- Checkbox for Billing Address Same as Shipping Address -->
        <div class="checkbox-align">
          <b-form-checkbox v-model="billingSameAsShipping">
            Billing = Shipping Address.
          </b-form-checkbox>
        </div>

        <!-- Conditional rendering for billing address inputs -->
        <template v-if="!billingSameAsShipping">
          <!-- Address Input -->
          <FormInput
            label="Address"
            label-for="billing-address"
            placeholder="Enter your billing address"
            v-model="billingDetails.address"
            required
          />

          <!-- Checkbox for Apartment/Suite Information -->
          <div class="checkbox-align">
            <b-form-checkbox
              id="has-billing-apartment"
              v-model="hasBillingApartment"
            >
              Includes Apt, Unit, Suite.
            </b-form-checkbox>
          </div>

          <!-- Conditionally Render Apartment/Suite Input -->
          <div v-if="hasBillingApartment">
            <FormInput
              label="Apt, Unit, or Suite"
              label-for="billing-apartment"
              placeholder="Apt, Unit, or Suite (Optional)"
              v-model="billingDetails.apartment"
            />
          </div>

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
      shippingDetails: {
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
      },
    };
  },
  watch: {
    cardholderNameSameAsShipping(newValue) {
      if (newValue) {
        this.billingDetails.cardholderName = `${this.shippingDetails.firstName} ${this.shippingDetails.lastName}`;
      } else {
        this.billingDetails.cardholderName = "";
      }
    },
    "shippingDetails.firstName": function (newValue) {
      if (this.cardholderNameSameAsShipping) {
        this.billingDetails.cardholderName = `${newValue} ${this.shippingDetails.lastName}`;
      }
    },
    "shippingDetails.lastName": function (newValue) {
      if (this.cardholderNameSameAsShipping) {
        this.billingDetails.cardholderName = `${this.shippingDetails.firstName} ${newValue}`;
      }
    },
  },
  methods: {
    onSubmitShipping() {
      this.$store.dispatch("updateShippingDetails", this.shippingDetails);
    },
    onSubmitBilling() {
      if (this.billingSameAsShipping) {
        this.billingDetails.address = this.shippingDetails.address;
        this.billingDetails.apartment = this.shippingDetails.apartment;
        this.billingDetails.city = this.shippingDetails.city;
        this.billingDetails.state = this.shippingDetails.state;
        this.billingDetails.zip = this.shippingDetails.zip;
      }
      if (this.cardholderNameSameAsShipping) {
        this.billingDetails.cardholderName = `${this.shippingDetails.firstName} ${this.shippingDetails.lastName}`;
      }
      this.$store.dispatch("updateBillingDetails", this.billingDetails);
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
