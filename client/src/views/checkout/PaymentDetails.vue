<template>
  <div>
    <h2 class="section-title">Payment Details</h2>
    <div class="info-container">
      <b-form @submit.prevent="onSubmitPayment">
        <!-- Square Secure Input Fields will be inserted here -->
        <div id="card-number"></div>
        <div id="expiration-date"></div>
        <div id="cvv"></div>

        <!-- Loading indicator and error messages -->
        <div v-if="isLoading" class="loading-indicator">Processing...</div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <!-- Submit Button -->
        <b-button
          :disabled="!isSdkLoaded || isLoading"
          type="submit"
          variant="primary"
        >
          Submit Payment Details
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      cardInstance: null,
      isSdkLoaded: false,
      isLoading: false,
      errorMessage: "",
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
      if (
        !document.querySelector(
          'script[src="https://sandbox.web.squarecdn.com/v2/square.js"]'
        )
      ) {
        const script = document.createElement("script");
        script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
        script.onload = this.waitForSDKThenInitialize;
        script.onerror = () => {
          this.errorMessage =
            "Failed to load the payment SDK. Please refresh the page.";
        };
        document.head.appendChild(script);
      } else {
        this.isSdkLoaded = true;
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

    async onSubmitPayment() {
      this.isLoading = true;
      this.errorMessage = "";

      console.log("Submitting payment with total:", this.orderTotal.total);

      try {
        const result = await this.cardInstance.tokenize();
        if (result.status === "OK") {
          await axios.post("/api/payment", {
            token: result.token,
            amount: this.orderTotal.total,
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

/Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/PaymentDetails.vue
