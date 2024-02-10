<!-- Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/products/ProductCard.vue -->
<template>
  <div class="product-card">
    <img :src="product.imageUrl" alt="Product Image" class="product-image" />
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-description">{{ product.description }}</p>
    <div class="product-price">${{ product.price }}</div>
    <!-- Add any additional product details here -->
  </div>
</template>

<script>
export default {
  name: "ProductCard",
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
</style>
