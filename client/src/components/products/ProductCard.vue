<template>
  <div class="product-card">
    <vue-slick-carousel
      :dots="true"
      :infinite="true"
      :autoplay="true"
      :autoplaySpeed="4000"
      :arrows="true"
      class="product-images-swiper"
    >
      <div
        v-for="(image, index) in product.imageSrc"
        :key="index"
        class="product-image-container"
      >
        <img :src="image" alt="Product image" class="product-image" />
      </div>
    </vue-slick-carousel>
    <div class="action-icons">
      <i class="bi bi-eye-fill" @click="quickView(product._id)"></i>
      <i class="bi bi-cart-fill" @click="addToCart(product)"></i>
      <i class="bi bi-heart-fill" @click="addToWishlist(product)"></i>
    </div>
    <div class="product-info">
      <div class="product-price">${{ product.variantPrice }}</div>
      <h3 class="product-name">{{ product.title }}</h3>
      <p class="product-description" v-html="product.bodyHtml"></p>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import { mapActions } from "vuex";

export default {
  name: "ProductCard",
  components: { VueSlickCarousel },
  props: { product: Object },
  methods: {
    ...mapActions("cart", ["addToCart", "addToWishlist"]),
    quickView(productId) {
      // Ensure correct namespacing for `setSelectedProduct` and `toggleModal`
      this.$store.dispatch("product/setSelectedProduct", productId);
      this.$store.dispatch("modal/toggleModal", true);
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.product-image-container {
  width: 100%;
  padding-top: 100%; /* Maintain aspect ratio */
  position: relative;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.action-icons {
  color: #ff6b81;
  display: flex;
  justify-content: center;
  gap: 2em; /* Space between icons */
  margin-top: 3em; /* Adjust spacing as needed */
}

.action-icons i {
  color: #ff6b81; /* Set icon color */
  transition: transform 0.3s ease, color 0.3s ease; /* Smooth transition for transform and color */
  cursor: pointer; /* Change cursor to pointer to indicate clickable items */
  font-size: 2rem; /* Adjust icon size as needed */
}

.action-icons i:hover {
  transform: scale(1.2); /* Slightly enlarge icons on hover */
  color: #b43a53; /* Darken the color on hover for feedback */
}

.product-name {
  margin: 1rem;
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
  margin: 2rem;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/products/ProductCard.vue -->
```
