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
                  :src="item.product.image"
                  alt="Product image"
                  class="cart-product-image"
                />
                <div class="ms-3">
                  <div>{{ item.product.name }} - ${{ item.product.price }}</div>
                  <div>Quantity: {{ item.quantity }}</div>
                </div>
              </div>
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
  mounted() {
    this.enrichedCartItems.forEach((item) => {
      if (!item.product || Object.keys(item.product).length === 0) {
        this.$store.dispatch("product/fetchProductById", item.productId);
      }
    });
  },
  computed: {
    enrichedCartItems() {
      return this.cartItems.map((item) => {
        const productDetails =
          this.getProductById(item.productId) || this.fetchPlaceholderProduct();
        return {
          ...item,
          product: productDetails,
        };
      });
    },
    cartTotal() {
      return this.enrichedCartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
    cartItems() {
      return this.$store.getters["cart/cartItems"];
    },
    estimatedShippingFee() {
      return this.$store.getters["cart/currentShippingFee"];
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
      this.$router.push({ name: "JewelryShowcase" });
    },
    // fetchPlaceholderProduct() {
    //   return {
    //     name: "Loading...",
    //     price: 0,
    //     image: "default-product-image.jpg",
    //   };
    // },
    getProductById(productId) {
      return this.$store.getters["product/getProductById"](productId);
    },
  },
};
</script>

<style scoped>
.cart-component .quantity-input {
  width: 60px;
  display: inline-block;
}

.cart-product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
