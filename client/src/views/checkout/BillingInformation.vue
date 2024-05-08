<template>
  <div>
    <h2 class="section-title">Billing Information</h2>
    <div class="info-container">
      <b-form @submit.prevent="onSubmitBilling">
        <!-- Checkbox for Cardholder Name Same as Shipping Name -->
        <div class="checkbox-align">
          <b-form-checkbox v-model="cardholderNameSameAsShipping">
            Card name same as above
          </b-form-checkbox>
        </div>
        <!-- Name on Card Input -->
        <FormInput
          label="Name on Card"
          label-for="cardholder-name"
          placeholder="Enter name on card"
          detailType="billing"
          fieldKey="cardholderName"
          v-model="computedCardholderName"
          required
          :disabled="cardholderNameSameAsShipping"
        />

        <!-- Billing Address Same as Shipping Address Checkbox -->
        <div class="checkbox-align">
          <b-form-checkbox v-model="isBillingSameAsShipping">
            Same as shipping address
          </b-form-checkbox>
        </div>

        <!-- Conditional Rendering for Billing Address Inputs -->
        <template v-if="!isBillingSameAsShipping">
          <FormInput
            label="Address"
            label-for="billing-address"
            placeholder="Enter your billing address"
            detailType="billing"
            fieldKey="address"
            required
          />

          <!-- Checkbox for Apt, Unit, or Suite Information in Billing -->
          <div class="checkbox-align">
            <b-form-checkbox id="has-apartment" v-model="hasBillingApartment">
              Includes an Apt or Suite
            </b-form-checkbox>
          </div>

          <!-- Apt, Unit, or Suite Input in Billing -->
          <div v-if="hasBillingApartment">
            <FormInput
              label="Apt or Suite"
              label-for="billing-apartment"
              placeholder="Apt or Suite (Optional)"
              detailType="billing"
              fieldKey="apartment"
            />
          </div>

          <FormInput
            label="City"
            label-for="billing-city"
            placeholder="Enter your city"
            detailType="billing"
            fieldKey="city"
            required
          />

          <FormInput
            label="State"
            label-for="billing-state"
            placeholder="Enter your state"
            detailType="billing"
            fieldKey="state"
            required
          />

          <FormInput
            label="ZIP Code"
            label-for="billing-zip"
            placeholder="Enter your ZIP code"
            detailType="billing"
            fieldKey="zip"
            required
          />
        </template>
      </b-form>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/common/FormInput.vue";

import { mapState, mapActions } from "vuex";

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      cardholderNameSameAsShipping: false,
      hasBillingApartment: false,
    };
  },
  computed: {
    ...mapState("checkout", [
      "billingDetails",
      "shippingDetails",
      "isBillingSameAsShipping",
    ]),
    computedCardholderName: {
      get() {
        return this.cardholderNameSameAsShipping
          ? `${this.shippingDetails.firstName} ${this.shippingDetails.lastName}`
          : this.billingDetails.cardholderName || "";
      },
      set(value) {
        if (!this.cardholderNameSameAsShipping) {
          this.$store.dispatch("checkout/updateDetail", {
            detailType: "billing",
            fieldKey: "cardholderName",
            value,
          });
        }
      },
    },
  },
  methods: {
    ...mapActions("checkout", ["updateDetail", "linkBillingToShipping"]),
    onSubmitBilling() {
      console.log("Billing information submitted", this.billingDetails);
    },
  },
  watch: {
    isBillingSameAsShipping(newValue) {
      this.linkBillingToShipping(newValue);
      if (newValue) {
        this.cardholderNameSameAsShipping = true;
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/sharedStyles.css";
</style>
