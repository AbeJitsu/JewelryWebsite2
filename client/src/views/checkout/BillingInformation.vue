<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/BillingInformation.vue -->

<template>
  <div class="info-container">
    <h2 class="section-title">Billing Information</h2>
    <b-form @submit.prevent="onSubmitBilling">
      <div class="checkbox-align">
        <b-form-checkbox
          v-model="cardholderNameSameAsShipping"
          @change="toggleCardholderName"
        >
          Card name same as above
        </b-form-checkbox>
      </div>

      <FormInput
        label="Name on Card"
        label-for="cardholder-name"
        placeholder="Enter name on card"
        detailType="billing"
        fieldKey="cardholderName"
        v-model="computedCardholderName"
        :disabled="cardholderNameSameAsShipping"
        required
      />

      <div class="checkbox-align">
        <b-form-checkbox
          v-model="isBillingSameAsShipping"
          @change="toggleBillingAddress"
        >
          Same as shipping address
        </b-form-checkbox>
      </div>

      <FormInput
        label="Address"
        label-for="billing-address"
        placeholder="Enter your billing address"
        detailType="billing"
        fieldKey="address"
        required
      />

      <div class="checkbox-align">
        <b-form-checkbox v-model="billingDetails.hasApartment"
          >Includes an Apt or Suite</b-form-checkbox
        >
      </div>
      <div v-if="billingDetails.hasApartment">
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

      <div class="button-group">
        <b-button
          @click="goBackToShipping"
          variant="secondary"
          class="secondary-button"
          >Back to Shipping</b-button
        >
        <b-button type="submit" variant="primary" class="primary-button"
          >Continue to Payment</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
import FormInput from "@/components/common/FormInput.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    FormInput,
  },
  computed: {
    ...mapState("checkout", [
      "shippingDetails",
      "billingDetails",
      "isBillingSameAsShipping",
    ]),
    computedCardholderName: {
      get() {
        return this.billingDetails.cardholderName;
      },
      set(value) {
        this.$store.dispatch("checkout/updateDetail", {
          detailType: "billing",
          field: "cardholderName",
          value,
        });
      },
    },
  },
  methods: {
    ...mapActions("checkout", ["updateDetail", "linkBillingToShipping"]),
    toggleCardholderName() {
      if (this.cardholderNameSameAsShipping) {
        this.computedCardholderName = `${this.shippingDetails.firstName} ${this.shippingDetails.lastName}`;
      } else {
        this.computedCardholderName = "";
      }
    },
    toggleBillingAddress() {
      this.linkBillingToShipping(this.isBillingSameAsShipping);
      if (!this.isBillingSameAsShipping) {
        this.computedCardholderName = `${this.shippingDetails.firstName} ${this.shippingDetails.lastName}`;
      }
    },
    onSubmitBilling() {
      this.updateDetail({
        detailType: "billing",
        field: "all",
        value: this.billingDetails,
      });
      this.$router.push({ name: "checkout-payment" });
    },
    goBackToShipping() {
      this.$router.push({ name: "checkout-shipping" });
    },
  },
  data() {
    return {
      cardholderNameSameAsShipping: false,
      isBillingSameAsShipping: false,
    };
  },
};
</script>

<style scoped>
@import "@/assets/styles/sharedStyles.scss";

.button-group {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}
</style>
