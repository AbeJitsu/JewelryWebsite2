<template>
  <div class="product-card">
    <vue-slick-carousel :dots="true" :infinite="true">
      <div v-for="(image, index) in product.imageSrc" :key="index">
        <img :src="image" alt="Product image" />
      </div>
    </vue-slick-carousel>

    <h3 class="product-name">{{ product.title }}</h3>
    <p class="product-description" v-html="product.bodyHtml"></p>
    <div class="product-price">${{ product.variantPrice }}</div>

    <!-- Interactive buttons -->
    <button class="btn-quick-view">Quick View</button>
    <button class="btn-add-cart">Add to Cart</button>
    <button class="btn-wishlist">Wishlist</button>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  name: "ProductCard",
  components: {
    VueSlickCarousel,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px; /* Adjust based on your layout */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.product-name {
  margin-top: 15px;
  margin-bottom: 10px;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.product-price {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.btn-quick-view,
.btn-add-cart,
.btn-wishlist {
  cursor: pointer;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  text-align: center;
}

.btn-quick-view:hover,
.btn-add-cart:hover,
.btn-wishlist:hover {
  background-color: #0056b3;
}

.product-images-swiper {
  margin-bottom: 20px;
}

/* Additional styles for swiper pagination, navigation, etc., if needed */
</style>
