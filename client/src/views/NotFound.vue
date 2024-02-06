<template>
  <div>
    <h1>404 Page Not Found</h1>
    <p>You will be redirected to the homepage in a few seconds...</p>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      // Only redirect if the current path is not already '/jewelry-showcase'
      if (this.$route.path !== "/jewelry-showcase") {
        this.$router.push("/jewelry-showcase");
      }
    }, 5000); // 5000ms = 5 seconds
  },
};
</script>
