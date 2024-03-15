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
              class="d-flex flex-column align-items-start"
            >
              <div class="d-flex align-items-center w-100">
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
                </div>
              </div>
              <div
                class="item-actions w-100 d-flex justify-content-start align-items-center mt-2"
              >
                <span class="quantity-label">Qty:</span>
                <b-form-input
                  type="number"
                  v-model="item.quantity"
                  min="1"
                  size="sm"
                  class="quantity-input"
                  @change="updateQuantity(item.product._id, item.quantity)"
                />
                <b-button
                  class="remove-button ms-2"
                  @click="removeFromCart(item.product._id)"
                  >Remove</b-button
                >
              </div>
            </b-list-group-item>
          </b-list-group>
          <div class="my-3">Total: ${{ cartTotal }}</div>
          <div class="my-3">
            Estimated Shipping: ${{ estimatedShippingFee }}
          </div>
          <b-button @click="proceedToCheckout">Checkout</b-button>
          <b-button @click="continueShopping">Continue Shopping</b-button>
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
.cart-component {
  max-width: 600px; /* Adjust the max-width as needed */
  margin: auto;
  margin-top: 2rem;
}

.product-info {
  margin-left: 1rem; /* Add margin to the left of the product info */
}

.cart-product-image {
  width: 8rem;
  height: auto;
  object-fit: contain;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Adjust the space between elements */
}

.quantity-label {
  margin-right: 0.5rem; /* Space between label and input */
  white-space: nowrap; /* Prevent line breaks */
}

.remove-button {
  font-size: 0.5rem; /* Adjust font size as needed */
  padding: 0.25rem 0.5rem; /* Adjust padding as needed */
  margin: rem; /* Adjust margin as needed */
  background-color: white; /* Set the background to white */
  color: #343a40; /* Set the text color to dark gray */
  border: none;
  transition: opacity 0.3s;
  opacity: 0.7; /* Hide the button by default */
}

.remove-button:hover {
  color: white; /* Text color changes to white on hover */
  background-color: #343a40; /* Background color changes to dark gray on hover */
  border: 1px solid white; /* Optional: invert the border color on hover */
}

.b-list-group-item:hover .remove-button {
  opacity: 1; /* Make the button fully visible on hover */
  color: #343a40; /* Set text color on hover */
  background-color: white; /* Set background color on hover */
}

.quantity-input {
  width: 5rem;
  display: inline-block;
  padding-left: 1rem;
}

.action-buttons .remove-button {
  color: #6c757d; /* Less prominent color */
  border-color: #6c757d; /* Matching border color */
  font-size: 0.5rem;
}

.action-buttons .remove-button:hover {
  color: #fff; /* Color change on hover for better UX */
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>
