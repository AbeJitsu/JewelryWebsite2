<template>
  <b-footer class="mt-auto py-4 bg-darker text-white">
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <h5>About Us</h5>
          <b-nav-item :to="{ name: 'about' }" class="link-pink"
            >Learn More</b-nav-item
          >
        </div>
        <div class="col-sm-4">
          <h5>Connect</h5>
          <b-nav-item :to="{ name: 'connect' }" class="link-pink"
            >Get in Touch</b-nav-item
          >
        </div>
        <div class="col-sm-4">
          <h5>Follow Us</h5>
          <a
            href="https://facebook.com"
            target="_blank"
            class="d-block link-pink"
          >
            <font-awesome-icon :icon="['fab', 'facebook-f']" /> Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            class="d-block link-pink"
          >
            <font-awesome-icon :icon="['fab', 'instagram']" /> Instagram
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            class="d-block link-pink"
          >
            <font-awesome-icon :icon="['fab', 'youtube']" /> YouTube
          </a>
        </div>
      </div>
    </div>
  </b-footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped>
.bg-darker {
  background-color: #121212; /* Very dark gray, almost black */
}

.link-pink,
.link-pink:hover {
  color: #ff6b81; /* Soft pink for text and icons */
}

.link-pink:hover {
  color: #ff8c99; /* Noticeably lighter pink on hover */
  text-decoration: none;
}

.social-icon {
  color: #ff6b81; /* Apply icon color directly for consistency */
}
</style>
