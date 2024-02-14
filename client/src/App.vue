<template>
  <div id="app">
    <TheHeader />
    <div style="flex: 1">
      <router-view />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
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
}

#app {
  font-family: "'Arimo'", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #371f2d;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: 500;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
