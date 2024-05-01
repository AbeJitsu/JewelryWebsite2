<template>
  <div class="action-icons">
    <div @click="onQuickView" class="icon-container">
      <i class="bi bi-eye-fill"></i>
      <span>View</span>
    </div>
    <div
      @click="onAddToCart"
      class="icon-container"
      :class="{ 'in-cart': isInCart }"
    >
      <i class="bi bi-cart-fill"></i>
      <span>{{ isInCart ? "In Cart" : "Add" }}</span>
    </div>
    <div @click="onAddToFavorites" class="icon-container">
      <i class="bi bi-heart-fill"></i>
      <span>Fave</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isInCart: Boolean,
    onQuickView: Function,
    onAddToCart: Function,
    onAddToFavorites: Function,
  },
};
</script>
