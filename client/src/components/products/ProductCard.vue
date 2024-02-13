<template>
  <div class="product-card">
    <!-- Product Carousel -->
    <vue-slick-carousel
      :dots="true"
      :infinite="true"
      :autoplay="true"
      :autoplaySpeed="4000"
      class="product-images-swiper"
    >
      <div
        v-for="(image, index) in product.imageSrc"
        :key="index"
        class="product-image-container"
      >
        <img :src="image" alt="Product image" class="product-image" />
        <div class="action-icons">
          <!-- Trigger Quick View Modal -->
          <i class="bi bi-eye-fill" @click="quickView(product)"></i>
          <i class="bi bi-cart-fill" @click="addToCart(product)"></i>
          <i class="bi bi-heart-fill" @click="addToWishlist(product)"></i>
        </div>
      </div>
    </vue-slick-carousel>

    <!-- Product Details -->
    <div class="product-price">${{ product.variantPrice }}</div>
    <h3 class="product-name">{{ product.title }}</h3>
    <p class="product-description" v-html="product.bodyHtml"></p>

    <!-- Quick View Modal -->
    <QuickViewModal
      :product="selectedProduct"
      :isVisible.sync="isModalVisible"
    />
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
export default {
  name: "ProductCard",
  components: {
    VueSlickCarousel,
  },
  props: {
    product: Object,
  },
  mounted() {
    console.log(this.product.imageSrc);
  },
  methods: {
    quickView() {
      // Implementation for quick view
    },
    addToCart() {
      // Implementation for adding to cart
    },
    addToWishlist() {
      // Implementation for adding to wishlist
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin: 1em; /* Center the card */
  width: 100%; /* Use maximum width */
  max-width: 300px; /* Maximum width of the card */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensure overflow from children is contained */
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%; /* Maintain aspect ratio */
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensure cover but adjust if necessary */
}

.action-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 0; /* Adjust padding */
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  gap: 2em; /* Space between icons */
  color: white;
  transition: transform 0.3s ease;
  transform: translateY(100%);
}

.product-image-container:hover .action-icons {
  transform: translateY(0); /* Slide up icons on hover */
}

.font-awesome-icon {
  font-size: 20px;
}

.product-name {
  margin: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Limit to 1 line */
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.product-price {
  margin: 1rem;
  padding-top: 1rem;
  font-size: 0.9;
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
.bi {
  font-family: "bootstrap-icons";
  font-size: 1.1rem; /* Adjust the size as needed */
}
</style>

<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/products/ProductCard.vue -->
```
