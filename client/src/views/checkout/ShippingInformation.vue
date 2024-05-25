<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/ShippingInformation.vue -->

<template>
  <div class="info-container">
    <h2 class="section-title">Shipping Information</h2>
    <b-form @submit.prevent="onSubmitShipping">
      <FormInput
        label="First Name"
        label-for="first-name"
        placeholder="Enter your first name"
        detailType="shipping"
        fieldKey="firstName"
        required
      />

      <FormInput
        label="Last Name"
        label-for="last-name"
        placeholder="Enter your last name"
        detailType="shipping"
        fieldKey="lastName"
        required
      />

      <FormInput
        label="Address"
        label-for="shipping-address"
        placeholder="Enter your shipping address"
        detailType="shipping"
        fieldKey="address"
        required
      />

      <div class="checkbox-align">
        <b-form-checkbox
          id="has-apartment"
          v-model="shippingDetails.hasApartment"
        >
          Includes an Apt or Suite
        </b-form-checkbox>
      </div>

      <div v-if="shippingDetails.hasApartment">
        <FormInput
          label="Apt or Suite"
          label-for="shipping-apartment"
          placeholder="Apt or Suite (Optional)"
          detailType="shipping"
          fieldKey="apartment"
        />
      </div>

      <FormInput
        label="City"
        label-for="shipping-city"
        placeholder="Enter your city"
        detailType="shipping"
        fieldKey="city"
        required
      />

      <FormInput
        label="State"
        label-for="shipping-state"
        placeholder="Enter your state"
        detailType="shipping"
        fieldKey="state"
        required
      />

      <FormInput
        label="ZIP Code"
        label-for="shipping-zip"
        placeholder="Enter your ZIP code"
        detailType="shipping"
        fieldKey="zip"
        required
      />

      <b-button type="submit" variant="primary">Continue to Billing</b-button>
    </b-form>
  </div>
</template>

<script>
import FormInput from "@/components/common/FormInput.vue";
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
      // Update shipping details in Vuex and proceed to the next step
      this.$store.commit("checkout/UPDATE_DETAIL", {
        detailType: "shipping",
        field: "all",
        value: this.shippingDetails,
      });
      this.$store.commit("checkout/SET_SHIPPING_COMPLETED", true);
      this.$router.push({ name: "checkout-billing" });
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/sharedStyles.css";
</style>
