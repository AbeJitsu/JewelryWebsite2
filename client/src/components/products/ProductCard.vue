<!-- Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/products/ProductCard.vue -->

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
        <span>Quick View</span>
      </div>
      <div @click="handleAddToCart(product)" class="icon-container">
        <i class="bi bi-cart-fill"></i>
        <span>{{ isInCart ? "In Cart" : "Add to Cart" }}</span>
      </div>
      <div @click="addToFavorites(product)" class="icon-container">
        <i class="bi bi-heart-fill"></i>
        <span>Favorite</span>
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
import { mapActions } from "vuex";

export default {
  name: "ProductCard",
  components: { VueSlickCarousel },
  props: { product: Object },
  data() {
    return {
      isInCart: false,
    };
  },
  methods: {
    ...mapActions("cart", ["addToCart", "addToFavorites", "checkCartStatus"]),
    quickView(productId) {
      this.$store.dispatch("product/setSelectedProduct", productId);
      this.$store.dispatch("modal/toggleModal", true);
    },
    async handleAddToCart(product) {
      if (!this.isInCart) {
        console.log(`Adding ${product._id} to cart`);
        await this.addToCart({
          productId: product._id,
          quantity: 1,
        });
        this.isInCart = true;
        console.log(
          `Product ${product._id} added to cart. isInCart: ${this.isInCart}`
        );
      }
    },
    async checkIfProductIsInCart() {
      this.isInCart = await this.checkCartStatus(this.product._id);
      console.log(
        `Checked cart status for ${this.product._id}: ${this.isInCart}`
      );
    },
  },
  created() {
    this.checkIfProductIsInCart();
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
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
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
  gap: 50px; /* Adjust the space between icon containers */
  margin-top: 2rem; /* Adjust spacing as needed */
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.icon-container i {
  font-size: 2rem; /* Icon size */
}

.icon-container span {
  font-size: 0.8rem; /* Text size */
}

.icon-container:hover i,
.icon-container:hover span {
  color: #b43a53; /* Change color on hover */
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
```
