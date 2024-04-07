<template>
  <div>
    <h2 class="section-title">Billing Information</h2>
    <div class="info-container">
      <b-form @submit.prevent="onSubmitBilling">
        <!-- Checkbox for Cardholder Name Same as Shipping Name -->
        <!-- Name on Card Input -->
        <FormInput
          label="Name on Card"
          label-for="cardholder-name"
          placeholder="Enter cardholder's name"
          v-model="computedCardholderName"
          required
          :disabled="cardholderNameSameAsShipping"
        />
        <div class="checkbox-align">
          <b-form-checkbox v-model="cardholderNameSameAsShipping">
            Same as shipping name
          </b-form-checkbox>
        </div>

        <!-- Billing Address Same as Shipping Address Checkbox -->
        <div class="checkbox-align">
          <b-form-checkbox v-model="billingSameAsShipping">
            Both addresses are the same
          </b-form-checkbox>
        </div>

        <!-- Conditional Rendering for Billing Address Inputs -->
        <template v-if="!billingSameAsShipping">
          <FormInput
            label="Address"
            label-for="billing-address"
            placeholder="Enter your billing address"
            detailType="billing"
            fieldKey="address"
            required
          />
          <!-- Checkbox for Apartment/Suite Information in Billing -->
          <div class="checkbox-align">
            <b-form-checkbox v-model="hasBillingApartment">
              Includes Apt, Unit, or Ste.
            </b-form-checkbox>
          </div>
          <!-- Apartment/Suite Input in Billing -->
          <div v-if="hasBillingApartment">
            <FormInput
              label="Apartment/Suite"
              label-for="billing-apartment"
              placeholder="Apartment, suite, etc. (Optional)"
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
          <!-- Name on Card Input -->
          <FormInput
            label="Name on Card"
            label-for="cardholder-name"
            placeholder="Enter cardholder's name"
            v-model="computedCardholderName"
            required
            :disabled="cardholderNameSameAsShipping"
          />
        </template>
      </b-form>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/form/FormInput.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      cardholderNameSameAsShipping: false,
      hasBillingApartment: false, // To control the apartment/suite field in billing
    };
  },
  computed: {
    ...mapState("checkout", ["billingDetails", "shippingDetails"]),
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
            field: "cardholderName",
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
};
</script>

<style scoped>
@import "@/assets/sharedStyles.css";
</style>
