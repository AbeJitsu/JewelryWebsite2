<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/PaymentDetails.vue -->

<template>
  <div>
    <h2 class="section-title">Payment Details</h2>
    <div>
      <AddressConfirmation @confirm="confirmAddresses" />
    </div>
    <div class="payment-form-container">
      <div class="info-container">
        <b-form @submit.prevent="onSubmitPayment">
          <div id="card-number"></div>
          <div id="expiration-date"></div>
          <div id="cvv"></div>
          <div v-if="isLoading" class="loading-indicator">Processing...</div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <b-button
            :disabled="!addressConfirmed || !isSdkLoaded || isLoading"
            type="submit"
            variant="primary"
            class="primary-button"
          >
            Submit Payment Details
          </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import AddressConfirmation from "./AddressConfirmation.vue";
import { mapGetters } from "vuex";
import checkoutService from "@/api/checkoutService";

export default {
  components: {
    AddressConfirmation,
  },
  data() {
    return {
      cardInstance: null,
      isSdkLoaded: false,
      isLoading: false,
      errorMessage: "",
      addressConfirmed: false,
    };
  },
  computed: {
    ...mapGetters({
      orderTotal: "cart/orderTotal",
    }),
  },
  mounted() {
    this.loadSquareSDK();
  },
  methods: {
    loadSquareSDK() {
      const scriptExists = document.querySelector(
        'script[src="https://sandbox.web.squarecdn.com/v1/square.js"]'
      );
      if (!scriptExists) {
        const script = document.createElement("script");
        script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
        script.onload = this.waitForSDKThenInitialize;
        script.onerror = () => {
          this.errorMessage =
            "Failed to load the payment SDK. Please refresh the page.";
        };
        document.head.appendChild(script);
      } else {
        this.waitForSDKThenInitialize();
      }
    },
    waitForSDKThenInitialize() {
      if (window.Square) {
        this.initializePaymentForm();
      } else {
        setTimeout(this.waitForSDKThenInitialize, 500);
      }
    },
    async initializePaymentForm() {
      const payments = window.Square.payments(
        "sandbox-sq0idb-FRXLrzfLW3ZjvpivifCFSA",
        "L3NGRS9FGWMXR"
      );
      this.cardInstance = await payments.card();
      await this.cardInstance.attach(
        "#card-number",
        "#expiration-date",
        "#cvv"
      );
      this.isSdkLoaded = true;
    },
    confirmAddresses() {
      this.addressConfirmed = true;
    },
    async onSubmitPayment() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const result = await this.cardInstance.tokenize();
        if (result.status === "OK") {
          await checkoutService.processCheckout({
            token: result.token,
            amount: this.orderTotal.total.total,
            currency: "USD",
          });
          this.$router.push({ name: "OrderConfirmation" });
        } else {
          this.errorMessage =
            "Tokenization failed: " +
            result.errors.map((e) => e.message).join(", ");
        }
      } catch (error) {
        this.errorMessage =
          "An error occurred during tokenization. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/sharedStyles.css";

.payment-form-container {
  margin-top: 2rem;
}
</style>
