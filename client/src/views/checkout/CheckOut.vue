<template>
  <div class="checkout-component">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "CheckoutComponent",
};
</script>

<style scoped>
.checkout-component {
  min-width: 40%;
  max-width: 50%;
  margin-top: 2rem;
}
</style>
