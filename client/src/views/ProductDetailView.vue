<template>
  <b-container fluid="lg" class="py-4">
    <b-row>
      <b-col cols="12" lg="6">
        <b-img :src="product.imageSrc[0]" alt="Product Image" fluid></b-img>
      </b-col>
      <b-col cols="12" lg="6">
        <h1>{{ product.title }}</h1>
        <p v-html="product.bodyHtml"></p>
        <p class="h4">Price: ${{ product.variantPrice }}</p>
        <b-button variant="primary" @click="handleAddToCart(product)"
          >Add to Cart</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      product: (state) => state.product.selectedProduct,
    }),
  },
  methods: {
    ...mapActions("product", ["fetchProduct"]),
    ...mapActions("cart", ["addToCart"]),
    handleAddToCart(product) {
      this.addToCart({ product: product, quantity: 1 }); // Ensuring we're passing the full product object along with quantity
    },
  },
  async created() {
    const productId = this.$route.params.id;
    await this.fetchProduct(productId);
  },
};
</script>
