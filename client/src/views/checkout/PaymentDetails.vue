<template>
  <div class="payment-info-container">
    <h2 class="section-title">Payment Details</h2>
    <b-form @submit.prevent="onSubmitPayment">
      <!-- Masked Card Number Input -->
      <b-form-group label="Card Number" label-for="card-number">
        <masked-input
          id="card-number"
          v-model="paymentDetails.cardNumber"
          mask="#### #### #### ####"
          placeholder="Enter your card number"
          required
        ></masked-input>
      </b-form-group>

      <!-- Masked Expiration Date Input -->
      <b-form-group label="Expiration Date" label-for="expiration-date">
        <masked-input
          id="expiration-date"
          v-model="paymentDetails.expirationDate"
          mask="##/##"
          placeholder="MM/YY"
          required
        ></masked-input>
      </b-form-group>

      <!-- Masked CVV Input -->
      <b-form-group label="CVV" label-for="cvv">
        <masked-input
          id="cvv"
          v-model="paymentDetails.cvv"
          mask="###"
          type="password"
          placeholder="CVV"
          required
        ></masked-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { MaskedInput } from "vue-the-mask";

export default {
  components: {
    MaskedInput,
  },
  data() {
    return {
      paymentDetails: {
        cardNumber: "",
        expirationDate: "",
        cvv: "",
      },
    };
  },
  methods: {
    onSubmitPayment() {
      // Emit event with payment details
      this.$emit("payment-details-submitted", this.paymentDetails);
    },
  },
};
</script>

<style scoped>
/* Add your CSS styling here */
</style>
