<template>
  <div class="jewelry-showcase">
    <div class="products-container">
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :product="product"
      />
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
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_API_URL}/api/products`
      );
      this.products = response.data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
};
</script>

<style>
.jewelry-showcase,
.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 2fr));
  gap: 1rem;
  padding: 1rem;
}

@media (max-width: 768px) {
  .jewelry-showcase,
  .products-container {
    grid-template-columns: repeat(auto-fit, minmax(36%, 2fr));
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
