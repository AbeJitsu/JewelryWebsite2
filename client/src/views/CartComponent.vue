<template>
  <b-container class="cart-component">
    <b-row>
      <b-col>
        <h2>Your Cart</h2>
        <b-list-group>
          <b-list-group-item
            v-for="(item, index) in cartItems"
            :key="index"
            class="d-flex justify-content-between align-items-center"
          >
            {{ item.product.name }} - ${{ item.product.price }} x
            {{ item.quantity }}
            <div>
              <b-button
                variant="outline-danger"
                @click="removeFromCart(item.product.id)"
                >Remove</b-button
              >
              <b-form-input
                type="number"
                v-model="item.quantity"
                min="1"
                size="sm"
                class="quantity-input"
                @change="updateQuantity(item.product.id, item.quantity)"
              />
            </div>
          </b-list-group-item>
        </b-list-group>
        <div class="my-3">Estimated Shipping: ${{ estimatedShippingFee }}</div>
        <b-button variant="primary" @click="proceedToCheckout"
          >Checkout</b-button
        >
        <b-button variant="secondary" @click="continueShopping"
          >Continue Shopping</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      cartItems: this.$store.getters["cart/cartItems"],
    };
  },
  computed: {
    estimatedShippingFee() {
      const totalPieces = this.cartItems.reduce((total, item) => {
        const pieceCount =
          item.product.type === "zi"
            ? 1
            : item.product.type === "fashion-fix"
            ? 4
            : 1;
        return total + pieceCount * item.quantity;
      }, 0);
      return this.calculateShippingFee(totalPieces);
    },
  },
  methods: {
    removeFromCart(productId) {
      this.$store.dispatch("cart/removeFromCart", productId);
    },
    updateQuantity(productId, quantity) {
      this.$store.dispatch("cart/updateQuantity", { productId, quantity });
    },
    proceedToCheckout() {
      this.$router.push({ name: "Checkout" }); // Ensure you have a Checkout route defined
    },
    continueShopping() {
      this.$router.push({ name: "jewelry-showcase" });
    },
    calculateShippingFee(pieces) {
      if (pieces <= 10) return 5;
      if (pieces <= 19) return 7;
      return 0; // Free shipping for 20 pieces or more
    },
  },
};
</script>

<style scoped>
.cart-component .quantity-input {
  width: 60px;
  display: inline-block;
}
</style>
