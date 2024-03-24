<template>
  <div class="payment-info-container">
    <h2 class="section-title">Payment Details</h2>
    <b-form @submit.prevent="onSubmitPayment">
      <!-- Square Secure Input Fields will be inserted here -->
      <div id="card-number"></div>
      <!-- <input type="text" />
      <form action="">testing!</form> -->
      <div id="expiration-date"></div>
      <div id="cvv"></div>

      <!-- Loading indicator and error messages -->
      <div v-if="isLoading" class="loading-indicator">Processing...</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <!-- Submit Button -->
      <b-button type="submit" variant="primary"
        >Submit Payment Details</b-button
      >
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card: null, // This will hold the Square card object
      isSdkLoaded: false, // Flag to check if the SDK is loaded
      isLoading: false, // Flag to indicate loading state
      errorMessage: "", // Error message to display if any
    };
  },
  mounted() {
    this.loadSquareSdk();
  },
  methods: {
    loadSquareSdk() {
      if (typeof window.Square === "undefined") {
        const script = document.createElement("script");
        script.src = "https://web.squarecdn.com/v2/square.js";
        script.async = true;
        script.onload = () => {
          this.isSdkLoaded = true;
          this.initializePaymentForm();
        };
        document.head.appendChild(script);
      } else {
        this.isSdkLoaded = true;
        this.initializePaymentForm();
      }
    },
    async initializePaymentForm() {
      if (!this.isSdkLoaded) {
        console.error("Square SDK is not loaded yet.");
        return;
      }

      const payments = window.Square.payments(
        "sandbox-sq0idb-FRXLrzfLW3ZjvpivifCFSA",
        "L3NGRS9FGWMXR"
      );
      this.card = await payments.card();
      await this.card.attach("#card-number", "#expiration-date", "#cvv");
    },
    async onSubmitPayment() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const result = await this.card.tokenize();
        if (result.status === "OK") {
          this.$emit("payment-details-submitted", result.token);
        } else {
          console.error("Tokenization failed:", result);
          this.errorMessage = "Tokenization failed. Please try again.";
        }
      } catch (error) {
        console.error("Tokenization error:", error);
        this.errorMessage = "An error occurred. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.section-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.payment-info-container {
  max-width: 60%;
  margin: auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

b-form-group label {
  font-weight: bold;
  color: #555;
}

b-form-group {
  margin-bottom: 15px;
}

.masked-input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

b-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
}

b-button:hover {
  background-color: #0056b3;
}

.loading-indicator {
  text-align: center;
  margin: 15px 0;
}

.error-message {
  color: #d9534f; /* Bootstrap's default danger color for better consistency */
  margin-top: 10px;
  text-align: center;
}
</style>
