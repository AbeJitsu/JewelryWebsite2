<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/cart/CartItem.vue -->

<template>
  <b-list-group-item class="item-container">
    <!-- Main Image -->
    <div class="main-image-container">
      <b-img
        :src="mainImage"
        alt="Main product image"
        class="main-image"
        @click="setMainImage(mainImage)"
      />
    </div>

    <!-- Additional Images -->
    <div class="additional-images">
      <b-img
        v-for="(image, idx) in additionalImages"
        :key="`additional-${idx}`"
        :src="image"
        alt="Additional product image"
        class="additional-image"
        @click="setMainImage(image)"
      />
    </div>

    <!-- Title, Price, and Item Actions -->
    <div class="title-price-actions">
      <div class="title-price">
        {{ item.product.title }} - Only ${{ item.product.variantPrice }}
      </div>
      <div class="item-actions">
        <span class="quantity-label">Quantity:</span>
        <b-form-select
          v-model="localQuantity"
          :options="quantityOptions"
          class="quantity-select"
          @change="handleQuantityChange"
        ></b-form-select>
        <b-button
          variant="danger"
          class="ml-2 remove-button"
          @click="removeFromCart"
        >
          Remove
        </b-button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="product-info">
      <p class="product-description" v-html="item.product.bodyHtml"></p>
    </div>
  </b-list-group-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    quantityOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      mainImage:
        this.item.product.imageSrc[this.item.product.imageSrc.length - 1],
      localQuantity: this.item.quantity,
    };
  },
  computed: {
    additionalImages() {
      return this.item.product.imageSrc.slice(0, -1);
    },
  },
  methods: {
    setMainImage(image) {
      this.mainImage = image;
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.item.product._id);
    },
    handleQuantityChange() {
      this.$emit("update-quantity", {
        productId: this.item.product._id,
        quantity: this.localQuantity,
      });
    },
  },
};
</script>

<style scoped>
.item-container {
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: auto auto auto;
  margin: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  border-radius: 0.25rem;
}

.item-container:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.main-image-container {
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: auto;
  align-self: start;
  justify-self: start;
}

.main-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.additional-images {
  grid-column: 1 / -1;
  grid-row: 3;
  display: flex;
  justify-content: space-around;
}

.additional-image {
  width: 15%;
  object-fit: cover;
  cursor: pointer;
}

.title-price {
  grid-column: 1;
  grid-row: 2;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 0;
}

.item-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 0;
}

.quantity-label {
  margin-right: 0.5rem;
}

.quantity-select {
  width: auto;
}

.product-info {
  grid-column: 2;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-size: 0.9rem;
}

.product-description {
  margin-bottom: 1rem;
}

.remove-button {
  font-size: 0.75rem;
  margin-left: 0.5rem;
}
</style>
