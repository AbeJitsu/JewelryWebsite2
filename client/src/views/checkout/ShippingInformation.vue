<template>
  <div>
    <h2 class="section-title">Shipping Information</h2>
    <div class="info-container">
      <b-form @submit.prevent="onSubmitShipping">
        <!-- Bind each FormInput directly to the Vuex store's state -->
        <!-- First Name Input -->
        <FormInput
          label="First Name"
          label-for="first-name"
          placeholder="Enter your first name"
          v-model="$store.state.checkout.shippingDetails.firstName"
          required
        />

        <!-- Last Name Input -->
        <FormInput
          label="Last Name"
          label-for="last-name"
          placeholder="Enter your last name"
          v-model="$store.state.checkout.shippingDetails.lastName"
          required
        />

        <!-- Address Input -->
        <FormInput
          label="Address"
          label-for="shipping-address"
          placeholder="Enter your shipping address"
          v-model="$store.state.checkout.shippingDetails.address"
          required
        />

        <!-- Checkbox for Apartment/Suite Information -->
        <div class="checkbox-align">
          <b-form-checkbox
            id="has-apartment"
            v-model="$store.state.checkout.shippingDetails.hasApartment"
          >
            Includes Apt, Unit, or Ste.
          </b-form-checkbox>
        </div>

        <!-- Conditionally Render Apartment/Suite Input -->
        <div v-if="$store.state.checkout.shippingDetails.hasApartment">
          <FormInput
            label="Apt, Unit, or Suite"
            label-for="shipping-apartment"
            placeholder="Apt, Unit, or Suite (Optional)"
            v-model="$store.state.checkout.shippingDetails.apartment"
          />
        </div>

        <!-- City Input -->
        <FormInput
          label="City"
          label-for="shipping-city"
          placeholder="Enter your city"
          v-model="$store.state.checkout.shippingDetails.city"
          required
        />

        <!-- State Input -->
        <FormInput
          label="State"
          label-for="shipping-state"
          placeholder="Enter your state"
          v-model="$store.state.checkout.shippingDetails.state"
          required
        />

        <!-- ZIP Code Input -->
        <FormInput
          label="ZIP Code"
          label-for="shipping-zip"
          placeholder="Enter your ZIP code"
          v-model="$store.state.checkout.shippingDetails.zip"
          required
        />
      </b-form>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/form/FormInput.vue";
import { mapActions } from "vuex";

export default {
  components: {
    FormInput,
  },
  methods: {
    ...mapActions("checkout", ["setShippingDetails"]),
    onSubmitShipping() {
      // Directly update Vuex store on submission
      this.setShippingDetails(this.$store.state.checkout.shippingDetails);
    },
  },
  created() {
    const storedData = localStorage.getItem("shippingDetails");
    if (storedData) {
      this.setShippingDetails(JSON.parse(storedData));
    }
  },
};
</script>

<style scoped>
@import "@/assets/sharedStyles.css";
/* .section-title {
  margin-bottom: 20px;
  margin-left: 25%;
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
  display: flex;
  /* justify-content: flex-start; */
  align-items: center;
  margin: 1rem;
  white-space: nowrap;
}

.form-group label {
  margin: 1rem;
  white-space: nowrap;
  text-align: right;
  min-width: 20rem;
}
/* 
b-form-input {
  flex-grow: 1;
}

b-form-checkbox {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex-grow: 1;
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
} */

.checkbox-align {
  margin-left: 33%; /* Adjust as needed for alignment */
}
</style>
/Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/ShippingInformation.vue
