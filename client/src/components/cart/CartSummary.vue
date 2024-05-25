<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/cart/CartSummary.vue -->

<template>
  <div class="cart-summary">
    <div class="my-3">Total: ${{ cartTotal }}</div>
    <div class="my-3">Estimated Shipping: ${{ estimatedShippingFee }}</div>
    <b-button class="checkout-button" @click="proceedToCheckOut"
      >CheckOut</b-button
    >
    <b-button class="continue-shopping-button" @click="continueShopping"
      >Continue Shopping</b-button
    >
  </div>
</template>

<script>
export default {
  props: {
    cartTotal: {
      type: Number,
      required: true,
    },
    estimatedShippingFee: {
      type: Number,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    proceedToCheckOut() {
      this.$emit("proceed-to-checkout");
    },
    continueShopping() {
      this.$emit("continue-shopping");
    },
  },
};
</script>

<style scoped>
.cart-summary {
  margin: 1rem;
  position: sticky;
  top: 7rem; /* Adjust this value based on TheHeader's height */
  background: white;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  border-radius: 1rem;
  z-index: 1;
}

.cart-summary:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.checkout-button,
.continue-shopping-button {
  margin: 1rem;
  margin-right: 1rem;
}

.checkout-button {
  background-color: #4caf50;
  color: white;
}

.continue-shopping-button {
  background-color: #f76c6c;
  color: white;
}

.checkout-button:hover,
.continue-shopping-button:hover {
  opacity: 0.9;
}
</style>
