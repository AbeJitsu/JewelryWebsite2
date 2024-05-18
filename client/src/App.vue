<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/App.vue -->

<template>
  <div id="app">
    <TheHeader />
    <div class="main-content">
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
}

.main-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
</style>
