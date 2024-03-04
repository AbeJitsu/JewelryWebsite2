<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <TheHeader />
    <div class="flex-grow-1">
      <router-view />
    </div>
    <TheFooter />
    <QuickViewModal />
  </div>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import QuickViewModal from "./components/products/QuickViewModal.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
    QuickViewModal,
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Arimo", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #371f2d;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>
