<template>
  <div id="app">
    <TheHeader />
    <div style="flex: 1">
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
/* html,
body {
  height: 100%;
  margin: 0;
} */

/* #app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
} */

#app {
  font-family: "'Arimo'", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #371f2d;
}
</style>
