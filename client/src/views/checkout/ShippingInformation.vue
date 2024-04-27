<script>
import FormInput from "@/components/form/FormInput.vue";
import { mapState } from "vuex";

export default {
  components: {
    FormInput,
  },
  computed: {
    ...mapState("checkout", ["shippingDetails"]),
  },
  methods: {
    onSubmitShipping() {
      console.log(
        "Form submitted with current shipping details:",
        this.shippingDetails
      );
      // Additional logic for form submission can be added here
    },
  },
  created() {
    // Example: Initialize data from localStorage if it exists
    const localShippingDetails = localStorage.getItem("shippingDetails");
    if (localShippingDetails) {
      const details = JSON.parse(localShippingDetails);
      this.$store.commit("checkout/UPDATE_DETAIL", {
        detailType: "shipping",
        field: "all",
        value: details,
      });
    }
  },
};
</script>

<template>
  <div>
    <h2 class="section-title">Shipping Information</h2>
    <div class="info-container">
      <b-form @submit.prevent="onSubmitShipping">
        <!-- First Name Input -->
        <FormInput
          label="First Name"
          label-for="first-name"
          placeholder="Enter your first name"
          detailType="shipping"
          fieldKey="firstName"
          required
        />

        <!-- Last Name Input -->
        <FormInput
          label="Last Name"
          label-for="last-name"
          placeholder="Enter your last name"
          detailType="shipping"
          fieldKey="lastName"
          required
        />

        <!-- Address Input -->
        <FormInput
          label="Address"
          label-for="shipping-address"
          placeholder="Enter your shipping address"
          detailType="shipping"
          fieldKey="address"
          required
        />

        <!-- Checkbox for Apt, Unit, or Suite Information -->
        <div class="checkbox-align">
          <b-form-checkbox
            id="has-apartment"
            v-model="shippingDetails.hasApartment"
          >
            Includes an Apt or Suite
          </b-form-checkbox>
        </div>

        <!-- Conditionally Render Apt, Unit, or Suite Input -->
        <div v-if="shippingDetails.hasApartment">
          <FormInput
            label="Apt or Suite"
            label-for="shipping-apartment"
            placeholder="Apt or Suite (Optional)"
            detailType="shipping"
            fieldKey="apartment"
          />
        </div>

        <!-- City Input -->
        <FormInput
          label="City"
          label-for="shipping-city"
          placeholder="Enter your city"
          detailType="shipping"
          fieldKey="city"
          required
        />

        <!-- State Input -->
        <FormInput
          label="State"
          label-for="shipping-state"
          placeholder="Enter your state"
          detailType="shipping"
          fieldKey="state"
          required
        />

        <!-- ZIP Code Input -->
        <FormInput
          label="ZIP Code"
          label-for="shipping-zip"
          placeholder="Enter your ZIP code"
          detailType="shipping"
          fieldKey="zip"
          required
        />
      </b-form>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/sharedStyles.css";
</style>
