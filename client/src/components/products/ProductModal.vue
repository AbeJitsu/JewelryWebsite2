<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <div class="product-details">
        <img :src="product.imageSrc" alt="Product Image" class="product-image" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p class="price">Price: {{ product.price }}</p>
        <!-- Add more product details as needed -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    isVisible: Boolean
  },
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false); // Emit an event to update visibility
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 90%;
}

.close-button {
  float: right;
  cursor: pointer;
}

.product-details img {
  max-width: 100%;
  height: auto;
}
</style>
