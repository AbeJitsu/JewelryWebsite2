<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/layout/TheHeader.vue -->

<template>
  <b-navbar
    toggleable="lg"
    type="darker"
    variant="darker"
    class="custom-navbar"
  >
    <b-navbar-brand
      to="/jewelry-showcase"
      class="custom-brand-text"
      tag="router-link"
    >
      <img
        :src="require('@/assets/logo.png')"
        alt="Logo"
        height="55"
        class="d-inline-block logo-custom-padding"
      />
      Escape, Relax & Be Jeweled
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'jewelry-showcase' }"
          >Explore Jewelry Showcase</b-nav-item
        >
        <!-- <b-nav-item :to="{ name: 'watch-live' }">Watch Live</b-nav-item> -->
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input
            size="md"
            class="mr-sm-5"
            placeholder="Find an amazing ..."
          ></b-form-input>
          <b-button size="md" class="my-2 my-sm-0" type="submit"
            >Search</b-button
          >
        </b-nav-form>
        <b-nav-item href="#"><b-icon icon="cart-fill"></b-icon></b-nav-item>
        <!-- Authentication Links -->
        <b-nav-item v-if="!isLoggedIn" @click="login">Login</b-nav-item>
        <b-nav-item v-if="isLoggedIn" @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("user", ["isLoggedIn"]),
  },
  methods: {
    ...mapActions("user", ["login", "logout"]),
    async login() {
      try {
        // Your login logic or navigate to a login page
        await this.login(); // Assuming this action handles the logic
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    async logout() {
      try {
        await this.logout(); // Logout the user
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
};
</script>

<style scoped>
.custom-navbar {
  background-color: #121212; /* Harmonize with .bg-darker from TheFooter.vue */
  color: #fff; /* Keep text color white for contrast */
}

.custom-navbar .navbar-nav .nav-link,
.custom-navbar .navbar-toggler-icon,
.custom-navbar .navbar-brand {
  color: #ff6b81; /* Soft pink color, similar to .link-pink */
  transition: color 0.3s ease, transform 0.3s ease; /* Smooth transition for hover effect */
}

.custom-navbar .navbar-nav .nav-link:hover,
.custom-navbar .navbar-nav .nav-link:focus,
.custom-navbar .navbar-toggler-icon:focus,
.custom-navbar .navbar-toggler-icon:hover,
.custom-navbar .navbar-brand:hover,
.custom-navbar .navbar-brand:focus {
  color: #ff8c99; /* Lighter pink on hover/focus, similar to .link-pink:hover */
  text-decoration: none; /* Remove underline on hover/focus */
  transform: scale(
    1.01
  ); /* Slightly increase size on hover/focus for emphasis */
}

.logo-custom-padding {
  margin: 0.25rem 1rem 0.25rem 1rem; /* top, right, bottom, left */
  border-radius: 50%; /* Circular logo */
}

.custom-brand-text {
  font-family: "Tangerine", cursive; /* Apply Tangerine font */
  font-size: 2rem; /* Adjust the size as needed */
  font-weight: 900; /* Example to apply the bold weight */
  margin: 0.25rem 1rem 0.25rem 0; /* top, right, bottom, left */
}

/* Additional styles for rounded search button */
.b-button {
  border-radius: 30px; /* Rounded edges for the search button */
}
</style>
