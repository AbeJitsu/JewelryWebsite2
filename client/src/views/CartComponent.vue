<template>
  <b-container class="cart-component">
    <b-row>
      <b-col>
        <div v-if="enrichedCartItems.length > 0">
          <b-list-group>
            <b-list-group-item
              v-for="(item, index) in enrichedCartItems"
              :key="index"
              class="item-container"
            >
              <!-- Main Image -->
              <div class="main-image-container">
                <b-img
                  :src="item.product.imageSrc[item.product.imageSrc.length - 1]"
                  alt="Main product image"
                  class="main-image"
                  @click="
                    setMainImage(
                      item,
                      item.product.imageSrc[item.product.imageSrc.length - 1]
                    )
                  "
                />
              </div>

              <!-- Additional Images -->
              <div class="additional-images">
                <b-img
                  v-for="(image, idx) in item.product.imageSrc.slice(0, -1)"
                  :key="`additional-${idx}`"
                  :src="image"
                  alt="Additional product image"
                  class="additional-image"
                  @click="setMainImage(item, image)"
                />
              </div>
              <div class="title-price">
                {{ item.product.title }} - ${{ item.product.variantPrice }}
              </div>
              <!-- Product Info -->
              <div class="product-info">
                <p
                  class="product-description"
                  v-html="item.product.bodyHtml"
                ></p>

                <div class="product-details">
                  <div class="item-actions">
                    <span class="quantity-label">Quantity:</span>
                    <b-form-select
                      v-model="item.quantity"
                      :options="quantityOptions"
                      class="quantity-select"
                      @change="updateQuantity(item.product._id, item.quantity)"
                    ></b-form-select>
                  </div>
                </div>
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
import Vue from "vue";
export default {
  data() {
    return {
      quantityOptions: [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
        { value: 6, text: "6" },
        { value: 7, text: "7" },
        { value: 8, text: "8" },
        { value: 9, text: "9" },
        { value: 0, text: "0" },
      ],
    };
  },

  computed: {
    enrichedCartItems() {
      return this.cartItems.map((item) => ({
        ...item,
        // Set mainImage to the last item in the imageSrc array
        mainImage:
          item.mainImage ||
          item.product.imageSrc[item.product.imageSrc.length - 1],
      }));
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
      return this.$store.state.cart.shippingInfo.currentShippingFee;
    },
  },
  methods: {
    getAdditionalImages(item) {
      return item.product.imageSrc.filter((image) => image !== item.mainImage);
    },
    setMainImage(item, image) {
      Vue.set(item, "mainImage", image);
    },
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
  },
};
</script>

<style scoped>
.cart-component {
  max-width: 70%;
  margin-top: 2rem;
}

.item-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
}

.main-image-container {
  grid-column: 1;
  grid-row: 1;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.additional-images {
  grid-column: 1 / -1;
  grid-row: 3;
  display: flex;
  justify-content: space-between;
  margin: 1rem;
}

.additional-image {
  width: 15%;
  object-fit: cover;
  cursor: pointer;
}

.product-info {
  grid-column: 2;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.product-description {
  margin-bottom: 1rem;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title-price {
  grid-column: 1;
  grid-row: 2;
  margin: 2rem;
  font-size: 1.1rem;
  font-weight: bold;
}

.item-actions {
  grid-column: 2;
  grid-row: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 2rem;
}

.quantity-label {
  margin-right: 0.5rem;
}

.quantity-select {
  width: auto;
}
</style>
