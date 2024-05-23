<template>
  <b-container class="checkout-component">
    <router-view />
  </b-container>
</template>

<script>
export default {
  name: "CheckOut",
};
</script>

<style scoped>
.checkout-component {
  min-width: 40%;
  max-width: 50%;
  margin-top: 2rem;
}
</style>
