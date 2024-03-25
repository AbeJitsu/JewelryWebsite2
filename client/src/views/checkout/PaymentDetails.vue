<template>
  <div class="payment-info-container">
    <h2 class="section-title">Payment Details</h2>
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cardInstance: null, // Storing the Square card object here
      isSdkLoaded: false, // Flag to check if the SDK is loaded
      isLoading: false, // Flag to indicate loading state
      errorMessage: "", // Error message to display if any
    };
  },

  mounted() {
    console.log("Component mounted, loading Square SDK...");
    this.loadSquareSDK();
  },

  methods: {
    loadSquareSDK() {
      console.log("Checking if Square SDK is already loaded...");
      if (
        document.querySelector(
          'script[src="https://web.squarecdn.com/v2/square.js"]'
        )
      ) {
        console.log("SDK already loaded, initializing payment form...");
        this.isSdkLoaded = true;
        this.waitForSDKThenInitialize();
      } else {
        console.log("SDK not found, creating script tag...");
        const script = document.createElement("script");
        script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
        script.onload = () => {
          console.log("Square SDK loaded successfully");
          this.isSdkLoaded = true;
          this.waitForSDKThenInitialize();
        };
        script.onerror = (error) => {
          console.error("Error loading Square SDK", error);
          this.errorMessage =
            "Failed to load the payment SDK. Please refresh the page.";
        };
        document.head.appendChild(script);
      }
    },

    waitForSDKThenInitialize() {
      if (typeof window.Square !== "undefined") {
        console.log(
          "Square object is now available. Initializing payment form..."
        );
        this.initializePaymentForm();
      } else {
        console.log("Waiting for Square object to be available...");
        setTimeout(this.waitForSDKThenInitialize, 500);
      }
    },

    async initializePaymentForm() {
      console.log("Initializing payment form...");
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
      console.log("Payment form initialized.");
    },

    async onSubmitPayment() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const result = await this.cardInstance.tokenize();
        if (result.status === "OK") {
          console.log("Tokenization successful.");

          // Emitting an event for parent components or other listeners
          this.$emit("payment-details-submitted", result.token);

          // Sending the token to the backend
          axios
            .post("/api/payment", { token: result.token })
            .then((response) => {
              console.log("Backend response:", response.data);
              // Handle success, navigate to confirmation page, etc.
              this.$router.push({ name: "OrderConfirmation" });
            })
            .catch((error) => {
              console.error("Backend error:", error);
              this.errorMessage = "Error processing payment. Please try again.";
            });
        } else {
          console.log("Tokenization failed.", result.errors);
          this.errorMessage =
            "Tokenization failed. " +
            (result.errors
              ? result.errors.map((e) => e.message).join(", ")
              : "Please try again.");
        }
      } catch (error) {
        console.error("Tokenization error:", error);
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
.section-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
  text-align: center;
}

.payment-info-container {
  max-width: 60%;
  margin: auto;
  padding: 2rem;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
}

.payment-info-container:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease-in-out;
  transform: scale(1.01);
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
