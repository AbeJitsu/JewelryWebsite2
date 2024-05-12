<!-- /Users/abiezerreyes/Documents/JewelryWebsite2/client/src/components/products/QuickViewModal.vue -->

<template>
  <b-modal :show="isModalOpen" @hide="closeModal" centered size="lg">
    <template v-slot:modal-title>
      {{ selectedProduct?.title || "Product Details" }}
    </template>
    <div v-if="selectedProduct" class="modal-body">
      <div class="modal-content-layout">
        <div class="image-container">
          <img
            :src="selectedProduct.imageSrc[0]"
            class="product-image"
            :alt="selectedProduct.title"
          />
        </div>
        <div class="details-container">
          <h2>{{ selectedProduct.title }}</h2>
          <p>{{ selectedProduct.description }}</p>
          <p class="price">Price: ${{ selectedProduct.variantPrice }}</p>
          <div class="actions">
            <b-button variant="primary" @click="handleAddToCart">
              Add to Cart
            </b-button>
            <b-button variant="info" @click="handleAddToFavorites">
              Add to Wishlist
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading-message">Loading product details...</div>
  </b-modal>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      isModalOpen: (state) => state.modal.isModalOpen,
      selectedProduct: (state) => state.product.selectedProduct,
    }),
  },
  methods: {
    ...mapActions("cart", ["addToCart", "addToFavorites"]),
    ...mapActions("modal", ["toggleModal"]),
    closeModal() {
      this.toggleModal(false);
    },
    handleAddToCart() {
      this.addToCart(this.selectedProduct);
    },
    handleAddToFavorites() {
      this.addToFavorites(this.selectedProduct);
    },
  },
};
</script>

<style scoped>
.modal-content-layout {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  flex: 1;
  max-width: 38.2%; /* Golden ratio for image section */
  padding: 20px;
}

.details-container {
  flex: 1;
  max-width: 61.8%; /* Golden ratio for details section */
  padding: 20px;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.loading-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
}

@media (max-width: 768px) {
  .modal-content-layout {
    flex-direction: column;
  }
}
</style>
