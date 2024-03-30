<template>
  <div>
    <!-- Shipping Information Section -->
    <h2 class="section-title">Shipping Info</h2>
    <div class="shipping-info-container">
      <b-form @submit.prevent="onSubmitShipping">
        <!-- First Name Input -->
        <b-form-group label="First Name" label-for="first-name">
          <b-form-input
            id="first-name"
            v-model="shippingDetails.firstName"
            required
            placeholder="Enter your first name"
          ></b-form-input>
        </b-form-group>

        <!-- Last Name Input -->
        <b-form-group label="Last Name" label-for="last-name">
          <b-form-input
            id="last-name"
            v-model="shippingDetails.lastName"
            required
            placeholder="Enter your last name"
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

        <!-- Checkbox for Apartment/Suite Information -->
        <b-form-checkbox v-model="hasApartment">
          I have an Apartment/Suite number
        </b-form-checkbox>

        <!-- Conditionally Render Apartment/Suite Input -->
        <b-form-group
          v-if="hasApartment"
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

        <!-- Checkbox to indicate if billing address is the same as shipping -->
        <b-form-checkbox v-model="billingSameAsShipping">
          Billing address is the same as shipping address
        </b-form-checkbox>

        <!-- Checkbox to indicate if cardholder's name is the same as the shipping name -->
        <b-form-checkbox v-model="cardholderNameSameAsShipping">
          Cardholder's name is the same as shipping name
        </b-form-checkbox>
      </b-form>
    </div>

    <!-- Billing Information Section, displayed regardless to allow cardholder's name entry -->
    <h2 class="section-title">Billing Information</h2>
    <div class="billing-info-container">
      <b-form @submit.prevent="onSubmitBilling">
        <!-- Cardholder's Name Input -->
        <b-form-group label="Cardholder's Name" label-for="cardholder-name">
          <b-form-input
            id="cardholder-name"
            v-model="billingDetails.cardholderName"
            :disabled="cardholderNameSameAsShipping"
            required
            :placeholder="
              cardholderNameSameAsShipping
                ? `${shippingDetails.firstName} ${shippingDetails.lastName}`
                : 'Enter cardholder\'s name'
            "
          ></b-form-input>
        </b-form-group>

        <!-- The rest of the billing address fields -->
        <!-- Only shown when billing address is not the same as shipping -->
        <template v-if="!billingSameAsShipping">
          <!-- Billing Address Inputs -->
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
        </template>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      billingSameAsShipping: false,
      cardholderNameSameAsShipping: false,
      hasApartment: false,
      shippingDetails: {
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
      },
      billingDetails: {
        cardholderName: "",
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
  watch: {
    cardholderNameSameAsShipping(newVal) {
      if (newVal) {
        this.billingDetails.cardholderName = `${this.shippingDetails.firstName} ${this.shippingDetails.lastName}`;
      } else {
        this.billingDetails.cardholderName = "";
      }
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
  padding: 1rem;
  margin-bottom: 20px;

  margin: auto; /* Center align the container */
}

b-form-group {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

b-form-group label {
  font-size: 1rem;
  color: #444;
  margin-right: 10px; /* Add space between the label and the input */
  width: 20%; /* Define a fixed width for the label */
}

b-form-input,
b-form-checkbox {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  flex-grow: 1; /* Input takes the remaining space */
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
