<template>
  <!-- Checkbox to indicate if billing address is the same as shipping -->
  <b-form-checkbox v-model="billingSameAsShipping">
    Billing address is the same as shipping address
  </b-form-checkbox>
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
</template>

<script>
export default {
  props: ["isSameAsShipping"],
  data() {
    return {
      billingDetails: {
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
      },
    };
  },
  watch: {
    isSameAsShipping(newVal) {
      if (newVal) {
        // Assuming you pass the shippingDetails as a prop too to autofill
        this.billingDetails = { ...this.shippingDetails };
      }
    },
  },
  methods: {
    emitBillingInfoChange() {
      this.$emit("billing-info-change", this.billingDetails);
    },
  },
};
</script>
