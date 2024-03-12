<template>
  <b-container class="checkout-component">
    <b-row>
      <b-col>
        <h2>Check Out</h2>
        <div v-if="cartItems.length > 0">
          <!-- Display cart items for review -->
          <h3>Review Your Order</h3>
          <b-list-group>
            <b-list-group-item
              v-for="(item, index) in cartItems"
              :key="index"
              class="d-flex justify-content-between align-items-center"
            >
              <div>{{ item.product.title }} ({{ item.quantity }})</div>
              <div>${{ item.product.variantPrice * item.quantity }}</div>
            </b-list-group-item>
          </b-list-group>

          <!-- Display total price -->
          <div class="my-3">Total: ${{ cartTotal }}</div>
          <div class="my-3">
            Estimated Shipping: ${{ estimatedShippingFee }}
          </div>

          <!-- Payment information and submit button -->
          <h3>Payment Information</h3>
          <!-- Include form elements for payment information here -->
          <b-button variant="success" @click="submitOrder"
            >Submit Order</b-button
          >
        </div>
        <div v-else>Your cart is empty.</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    cartItems() {
      return this.$store.getters["cart/cartItems"];
    },
    cartTotal() {
      return this.cartItems.reduce(
        (total, item) => total + item.product.variantPrice * item.quantity,
        0
      );
    },
    estimatedShippingFee() {
      return this.$store.state.cart.shippingInfo.currentShippingFee;
    },
  },
  methods: {
    submitOrder() {
      // Implement order submission logic
      alert("Order submitted!");
    },
  },
};
</script>

<style scoped>
/* Add your CSS styling here */
</style>

./CheckOut.vue
