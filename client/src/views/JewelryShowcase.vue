<!-- /Users/abiezerreyes/Documents/JewelryWebsite2/client/src/views/JewelryShowcase.vue  -->

<template>
  <div class="jewelry-showcase">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-else class="products-container">
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :product="product"
        ref="productCards"
      />
      <div v-if="isLoading" class="loading-indicator">Loading...</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "../components/products/ProductCard.vue";

export default {
  name: "JewelryShowcase",
  components: { ProductCard },
  data() {
    return {
      products: [],
      observer: null,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      try {
        const offset = this.products.length;
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/products?offset=${offset}&limit=12`
        );
        this.products = this.products.concat(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        this.error = "Failed to load products. Please try again later.";
      } finally {
        this.isLoading = false;
        this.$nextTick(() => {
          this.updateObserver();
        });
      }
    },
    createObserver() {
      const options = {
        root: null,
        threshold: 1.0,
      };
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isLoading) {
            this.fetchProducts();
          }
        });
      }, options);
    },
    updateObserver() {
      if (this.products.length >= 9) {
        const newTarget = this.$refs.productCards[8]; // 9th product
        if (this.observer && newTarget) {
          this.observer.disconnect();
          this.observer.observe(newTarget);
        }
      }
    },
  },
  mounted() {
    this.fetchProducts();
    this.$nextTick(() => {
      this.createObserver();
    });
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>

<style scoped>
.jewelry-showcase,
.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 2fr));
  gap: 1rem;
  margin: 1% 5% 1% 5%;
}

@media (max-width: 768px) {
  .jewelry-showcase,
  .products-container {
    grid-template-columns: repeat(auto-fit, minmax(45%, 2fr));
  }
}

@media (max-width: 480px) {
  .jewelry-showcase,
  .products-container {
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    gap: 15px;
    padding: 15px;
  }
}
</style>
