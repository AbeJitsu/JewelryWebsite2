<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/products/ProductCard.vue -->
<template>
  <div class="product-card">
    <ProductCarousel :images="product.imageSrc" />

    <ActionIcons
      :isInCart="isProductInCart(product._id)"
      :onQuickView="quickView"
      :onAddToCart="handleAddToCart"
      :onAddToFavorites="addToFavorites"
    />
    <div class="product-info">
      <div class="name-price-container">
        <h3 class="product-name">{{ product.title }}</h3>
        <div class="product-price">${{ product.variantPrice }}</div>
      </div>
      <p class="product-description" v-html="product.bodyHtml"></p>
    </div>
  </div>
</template>

<script>
import ProductCarousel from "./ProductCarousel.vue";
import ActionIcons from "./ActionIcons.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductCard",
  components: { ProductCarousel, ActionIcons },
  props: { product: Object },
  computed: {
    ...mapGetters("cart", ["isProductInCart"]),
  },
  methods: {
    ...mapActions("cart", ["addToCart", "addToFavorites"]),
    quickView() {
      this.$store.dispatch("modal/selectProductForQuickView", this.product._id);
    },
    handleAddToCart() {
      if (!this.isProductInCart(this.product._id)) {
        this.addToCart({
          product: this.product,
          quantity: 1,
        });
      }
    },
    addToFavorites() {
      // Implementation for adding to favorites using this.product
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #eee;
  border-radius: 0.25rem;
  padding: 20px;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  min-width: 60%;
  max-width: 90%;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
}

.product-card:hover {
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
  transition: color 0.3s ease, transform 0.3s ease-in-out;
}

.action-icons {
  color: #ff6b81;
  display: flex;
  justify-content: center;
  gap: 1rem; /* Adjust the space between icon containers */
  margin-top: 3rem; /* Adjust spacing as needed */
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  white-space: nowrap; /* Ensure text doesn't wrap */
}

.icon-container i,
.icon-container span {
  transition: color 0.3s ease, transform 0.3s ease-in-out;
}

.icon-container:hover i,
.icon-container:hover span {
  color: #ff8c99; /* Change color on hover */
  transform: scale(1.1); /* Slightly enlarge on hover */
}

.product-info {
  display: flex;
  flex-direction: column;
}

.name-price-container {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.product-name {
  margin: 10px;
  font-size: 1em;
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Limit to 1 line */
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.product-price {
  padding: 1em;
  font-size: 1em;
}

.product-description {
  margin: 10px;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
