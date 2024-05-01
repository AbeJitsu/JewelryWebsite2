<template>
  <vue-slick-carousel
    :dots="true"
    :infinite="true"
    :autoplay="true"
    :autoplaySpeed="3000"
    :arrows="true"
    class="product-images-swiper"
  >
    <div
      v-for="(image, index) in images"
      :key="index"
      class="product-image-container"
    >
      <img :src="image" alt="Product image" class="product-image" />
    </div>
  </vue-slick-carousel>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
export default {
  name: "ProductCarousel",
  components: { VueSlickCarousel },
  props: {
    images: Array,
  },
};
</script>

<style scoped>
.product-image-container {
  min-width: 100%;
  padding-top: 100%;
  position: relative;
  margin-bottom: 2rem;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
