<template>
  <div class="jewelry-showcase">
    <h1>Jewelry Showcase</h1>
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
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    console.log("VUE_APP_API_URL:", process.env.VUE_APP_API_URL);
    console.log(process.env);
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
.jewelry-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* Add more styles as necessary */
</style>
