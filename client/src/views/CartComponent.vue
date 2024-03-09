<template>
  <b-container class="cart-component">
    <b-row>
      <b-col>
        <h2>Your Cart</h2>
        <div v-if="enrichedCartItems.length > 0">
          <b-list-group>
            <b-list-group-item
              v-for="(item, index) in enrichedCartItems"
              :key="index"
              class="d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <b-img
                  :src="item.product.imageSrc[0]"
                  alt="Product image"
                  class="cart-product-image"
                  @click="viewProductDetails(item.product)"
                />
                <div class="ms-3">
                  <div>
                    {{ item.product.title }} - ${{ item.product.variantPrice }}
                  </div>
                  <div>Quantity: {{ item.quantity }}</div>
                </div>
              </div>
              <div>
                <b-button
                  variant="outline-danger"
                  @click="removeFromCart(item.product._id)"
                  >Remove</b-button
                >
                <b-form-input
                  type="number"
                  v-model="item.quantity"
                  min="1"
                  size="sm"
                  class="quantity-input"
                  @change="updateQuantity(item.product._id, item.quantity)"
                />
              </div>
            </b-list-group-item>
          </b-list-group>
          <div class="my-3">Total: ${{ cartTotal }}</div>
          <div class="my-3">
            Estimated Shipping: ${{ estimatedShippingFee }}
          </div>
          <b-button variant="primary" @click="proceedToCheckout"
            >Checkout</b-button
          >
          <b-button variant="secondary" @click="continueShopping"
            >Continue Shopping</b-button
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
    enrichedCartItems() {
      return this.cartItems;
    },
    cartTotal() {
      return this.enrichedCartItems.reduce(
        (total, item) => total + item.product.variantPrice * item.quantity,
        0
      );
    },
    cartItems() {
      return this.$store.getters["cart/cartItems"];
    },
    estimatedShippingFee() {
      // Directly return the current shipping fee from the store's shipping info
      return this.$store.state.cart.shippingInfo.currentShippingFee;
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
      this.$router.push({ name: "Checkout" });
    },
    continueShopping() {
      this.$router.push("/jewelry-showcase");
    },
    viewProductDetails(product) {
      this.$router.push({
        name: "ProductDetails",
        params: { id: product._id },
      });
    },
  },
  watch: {
    cartItems: {
      handler() {
        this.$store.commit("cart/CALCULATE_SHIPPING_FEE");
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.cart-component .quantity-input {
  width: 3rem;
  display: inline-block;
  padding-left: 1rem;
}

.cart-product-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>
