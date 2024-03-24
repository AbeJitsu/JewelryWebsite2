<template>
  <div>
    <!-- Shipping Information Section -->
    <h2 class="section-title">Shipping Information</h2>
    <div class="shipping-info-container">
      <b-form @submit.prevent="onSubmitShipping">
        <!-- Shipping Name Input -->
        <b-form-group label="Name" label-for="shipping-name">
          <b-form-input
            id="shipping-name"
            v-model="shippingDetails.name"
            required
            placeholder="Enter your name"
          ></b-form-input>
        </b-form-group>
        <!-- Shipping Address Input -->
        <b-form-group label="Address" label-for="shipping-address">
          <b-form-input
            id="shipping-address"
            v-model="shippingDetails.address"
            required
            placeholder="Enter your shipping address"
          ></b-form-input>
        </b-form-group>

        <!-- Shipping Apartment/Suite Input (Optional) -->
        <b-form-group
          label="Apartment/Suite (Optional)"
          label-for="shipping-apartment"
        >
          <b-form-input
            id="shipping-apartment"
            v-model="shippingDetails.apartment"
            placeholder="Apartment, suite, etc. (Optional)"
          ></b-form-input>
        </b-form-group>

        <!-- Shipping City Input -->
        <b-form-group label="City" label-for="shipping-city">
          <b-form-input
            id="shipping-city"
            v-model="shippingDetails.city"
            required
            placeholder="Enter your city"
          ></b-form-input>
        </b-form-group>

        <!-- Shipping State Input -->
        <b-form-group label="State" label-for="shipping-state">
          <b-form-input
            id="shipping-state"
            v-model="shippingDetails.state"
            required
            placeholder="Enter your state"
          ></b-form-input>
        </b-form-group>

        <!-- Shipping ZIP Code Input -->
        <b-form-group label="ZIP Code" label-for="shipping-zip">
          <b-form-input
            id="shipping-zip"
            v-model="shippingDetails.zip"
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

    <!-- Billing Information Section -->
    <div v-if="!billingSameAsShipping">
      <h2 class="section-title">Billing Information</h2>
      <div class="billing-info-container">
        <b-form @submit.prevent="onSubmitBilling">
          <!-- Billing Name Input -->
          <b-form-group label="Name" label-for="billing-name">
            <b-form-input
              id="billing-name"
              v-model="billingDetails.name"
              required
              placeholder="Cardholder's name"
            ></b-form-input>
          </b-form-group>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      billingSameAsShipping: false,
      shippingDetails: {
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
      },
      billingDetails: {
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
      },
    };
  },
  methods: {
    onSubmitShipping() {
      // Handle shipping form submission
    },
    onSubmitBilling() {
      // Handle billing form submission
    },
  },
};
</script>

<style scoped>
.section-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.shipping-info-container,
.billing-info-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

b-form-group {
  margin-bottom: 1rem;
}

b-form-group label {
  font-size: 1rem;
  color: #444;
  margin-bottom: 0.5rem;
  text-align: left; /* Align labels to the left */
  display: block; /* Ensure labels take up the full width to align the input below */
}

b-form-input,
b-form-checkbox {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
}

b-button {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
}

b-button:hover {
  background-color: #003974;
}
</style>
