<template>
  <div class="product-card">
    <vue-slick-carousel
      :dots="true"
      :infinite="true"
      :autoplay="true"
      :autoplaySpeed="3000"
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
      <div @click="quickView(product._id)" class="icon-container">
        <i class="bi bi-eye-fill"></i>
        <span>View</span>
      </div>
      <div
        @click="handleAddToCart"
        class="icon-container"
        :class="{ 'in-cart': isProductInCart(product._id) }"
      >
        <i class="bi bi-cart-fill"></i>
        <span>{{ isProductInCart(product._id) ? "In Cart" : "Add" }}</span>
      </div>
      <div @click="addToFavorites(product)" class="icon-container">
        <i class="bi bi-heart-fill"></i>
        <span>Fave</span>
      </div>
    </div>
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
import VueSlickCarousel from "vue-slick-carousel";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductCard",
  components: { VueSlickCarousel },
  props: { product: Object },
  computed: {
    ...mapGetters("cart", ["isProductInCart"]),
  },
  methods: {
    ...mapActions("cart", ["addToCart", "addToFavorites"]),
    quickView(productId) {
      this.$store.dispatch("product/setSelectedProduct", productId);
      this.$store.dispatch("modal/toggleModal", true);
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
  border-radius: 8px;
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

.product-image-container {
  min-width: 100%;
  padding-top: 100%;
  position: relative;
  margin-bottom: 2rem;
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
<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/products/ProductCard.vue -->
