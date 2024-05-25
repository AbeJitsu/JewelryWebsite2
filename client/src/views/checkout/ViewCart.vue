<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/ViewCart.vue -->

<template>
  <b-container class="cart-component">
    <b-row>
      <!-- Cart Items Column -->
      <b-col md="8">
        <div v-if="enrichedCartItems.length > 0">
          <b-list-group>
            <CartItem
              v-for="(item, index) in enrichedCartItems"
              :key="index"
              :item="item"
              :quantityOptions="quantityOptions"
              @remove-from-cart="removeFromCart"
              @update-quantity="updateQuantity"
            />
          </b-list-group>
        </div>
        <div v-else>Your cart is empty.</div>
      </b-col>
      <!-- Cart Summary Column -->
      <b-col md="4">
        <CartSummary
          :cartTotal="cartTotal"
          :estimatedShippingFee="estimatedShippingFee"
          :isLoggedIn="isLoggedIn"
          @proceed-to-checkout="proceedToCheckOut"
          @continue-shopping="continueShopping"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CartItem from "@/components/cart/CartItem.vue";
import CartSummary from "@/components/cart/CartSummary.vue";

export default {
  components: {
    CartItem,
    CartSummary,
  },
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
      return this.$store.getters["cart/currentShippingFee"];
    },
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
  },
  methods: {
    removeFromCart(productId) {
      this.$store.dispatch("cart/removeFromCart", productId);
    },
    updateQuantity({ productId, quantity }) {
      if (quantity === 0) {
        this.removeFromCart(productId);
      } else {
        this.$store.dispatch("cart/updateQuantity", { productId, quantity });
      }
    },
    proceedToCheckOut() {
      if (!this.isLoggedIn) {
        this.$store.commit("cart/VUE_APP_LOGIN_REDIRECT", "CheckOut");
        this.$bvModal.show("auth-modal");
      } else {
        this.$router.push({ name: "checkout-shipping" });
      }
    },
    continueShopping() {
      this.$router.push("/jewelry-showcase");
    },
  },
};
</script>

<style scoped>
.cart-component {
  margin-top: 1rem;
}
</style>
