<template>
  <div id="app">
    <TheHeader />
    <div class="flex-grow-1">
      <router-view />
    </div>
    <TheFooter />
    <QuickViewModal />
  </div>
</template>

<script>
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";
import QuickViewModal from "@/components/products/QuickViewModal.vue";

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
  text-align: justify;
  /* color: #371f2d; */
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>

<!-- Users/abiezerreyes/Projects/JewelryWebsite2/client/src/App.vue -->
