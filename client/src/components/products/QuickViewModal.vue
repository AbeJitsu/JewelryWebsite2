<template>
  <b-modal v-model="isModalOpen" @hide="closeModal" id="quick-view-modal">
    <template v-slot:modal-title>
      {{ selectedProduct?.title || 'Product Details' }}
    </template>
    <div v-if="selectedProduct" class="product-details">
      <img :src="selectedProduct.imageSrc[0]" alt="Product Image" class="product-image" />
      <h2>{{ selectedProduct.title }}</h2>
      <p>{{ selectedProduct.description }}</p>
      <p class="price">Price: ${{ selectedProduct.variantPrice }}</p>
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
    <div v-else>Product details not available.</div>
  </b-modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      quantity: 1,
    };
  },
  computed: {
    ...mapState('modal', ['isModalOpen']),
    selectedProduct() {
      // Assuming your product details are stored in a 'product' module
      // and that 'getProductById' is a getter that returns a product based on ID
      console.log('selectedProductId', this.$store.state.modal.selectedProductId);
      return this.$store.getters['product/getProductById'](this.$store.state.modal.selectedProductId);
    },
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'addToWishlist']),
    closeModal() {
      this.$store.dispatch('modal/toggleModal', false);
    },
    handleAddToCart() {
      this.addToCart({ product: this.selectedProduct, quantity: this.quantity });
      this.closeModal();
    },
    handleAddToWishlist() {
      this.addToWishlist(this.selectedProduct);
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
.product-image {
  width: 100%;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.quantity-selector, .btn {
  margin: 5px;
}
</style>


<!-- Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/products/QuickViewModal.vue -->