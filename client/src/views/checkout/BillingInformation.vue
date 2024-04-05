<template>
  <div>
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
          <!-- Dynamically bind each input to the Vuex store -->
          <FormInput
            label="Address"
            label-for="billing-address"
            placeholder="Enter your billing address"
            v-model="billingDetails.address"
            required
          />
          <FormInput
            v-if="hasBillingApartment"
            label="Apartment/Suite"
            label-for="billing-apartment"
            placeholder="Apartment, suite, etc. (Optional)"
            v-model="billingDetails.apartment"
          />
          <FormInput
            label="City"
            label-for="billing-city"
            placeholder="Enter your city"
            v-model="billingDetails.city"
            required
          />
          <FormInput
            label="State"
            label-for="billing-state"
            placeholder="Enter your state"
            v-model="billingDetails.state"
            required
          />
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
import { mapState, mapActions } from "vuex";

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      cardholderNameSameAsShipping: false,
    };
  },
  computed: {
    ...mapState("checkout", ["billingDetails", "shippingDetails"]),
    computedCardholderName: {
      get() {
        return this.cardholderNameSameAsShipping
          ? `${this.shippingDetails.firstName} ${this.shippingDetails.lastName}`
          : this.billingDetails.cardholderName;
      },
      set(value) {
        if (!this.cardholderNameSameAsShipping) {
          this.$store.dispatch("checkout/updateBillingDetails", {
            cardholderName: value,
          });
        }
      },
    },
    billingSameAsShipping: {
      get() {
        return this.$store.state.checkout.isBillingSameAsShipping;
      },
      set(value) {
        this.$store.dispatch("checkout/toggleBillingSameAsShipping", value);
      },
    },
  },
  methods: {
    ...mapActions("checkout", ["setBillingDetails"]),
    onSubmitBilling() {
      this.setBillingDetails(this.billingDetails);
    },
  },
  watch: {
    cardholderNameSameAsShipping(newValue) {
      if (newValue) {
        this.setBillingDetails({
          ...this.billingDetails,
          cardholderName: `${this.shippingDetails.firstName} ${this.shippingDetails.lastName}`,
        });
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/sharedStyles.css";
</style>
<!-- Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/BillingInformation.vue -->
