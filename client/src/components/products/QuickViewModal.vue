<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <div class="product-details">
        <img :src="product.imageSrc" alt="Product Image" class="product-image" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p class="price">Price: {{ product.price }}</p>

        <div class="modal-actions">
          <div class="quantity-selector">
            <button @click="decreaseQuantity">-</button>
            <input type="number" v-model="quantity" min="1" />
            <button @click="increaseQuantity">+</button>
          </div>
          <button class="btn btn-primary" @click="handleAddToCart">Add to Cart</button>
          <button class="btn btn-secondary" @click="handleAddToWishlist">Add to Wishlist</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    product: Object,
    isVisible: Boolean,
  },
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    ...mapActions(['addToCart', 'addToWishlist']),
    closeModal() {
      this.$emit('update:isVisible', false);
    },
    handleAddToCart() {
      this.addToCart({ product: this.product, quantity: this.quantity });
      this.closeModal();
    },
    handleAddToWishlist() {
      this.addToWishlist(this.product);
      this.closeModal();
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
};
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
