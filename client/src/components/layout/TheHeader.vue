<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/layout/TheHeader.vue -->

<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="darker"
      variant="darker"
      class="custom-navbar"
    >
      <b-navbar-brand to="/jewelry-showcase" class="custom-brand-container">
        <img
          :src="require('@/assets/logo.png')"
          alt="Logo"
          class="logo-image"
        />
        <span class="logo-text">Escape, Relax & Be Jeweled</span>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'jewelry-showcase' }">Shop</b-nav-item>
          <!-- Additional nav items here -->
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div
            class="search-container d-flex align-items-center justify-content-between flex-grow-1 mx-2"
          >
            <b-form-input
              size="md"
              class="flex-grow-1"
              placeholder="Find an amazing ..."
            ></b-form-input>
            <b-button size="md" class="ml-2" type="submit">Search</b-button>
          </div>
          <!-- For Sign In, you could use a 'key-fill' icon to represent logging in -->
          <b-nav-item v-if="!isLoggedIn" @click="showAuthModal">
            <b-icon icon="key-fill"></b-icon> Shine In
          </b-nav-item>

          <!-- For Sign Out, an 'box-arrow-right' icon can represent logging out -->
          <b-nav-item v-else @click="performLogout">
            <b-icon icon="box-arrow-right"></b-icon> Shine Out
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <auth-modal></auth-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AuthModal from "@/components/layout/AuthModal.vue";

export default {
  components: {
    AuthModal,
  },
  computed: {
    // This now correctly maps the isLoggedIn getter from the Vuex store.
    ...mapGetters("user", ["isLoggedIn"]),
  },
  methods: {
    // This maps the logout action from the Vuex store.
    ...mapActions("user", {
      logout: "logout",
    }),
    showAuthModal() {
      this.$bvModal.show("auth-modal");
    },
    async performLogout() {
      try {
        await this.logout();
        // After logout, you might want to redirect the user or show a success message.
      } catch (error) {
        console.error("Logout error:", error);
        // Consider handling the error, perhaps by displaying a message to the user.
      }
    },
  },
};
</script>

<style scoped>
.custom-brand-container {
  display: flex;
  align-items: center;
  gap: 1em; /* Space between logo image and text */
}

.logo-image {
  height: 4em; /* Adjust as needed */
  border-radius: 25%; /* Circular logo */
}

.logo-text {
  color: #fff;
  font-family: "Tangerine", cursive;
  font-size: 3rem;
  font-weight: 100;
  color: #ff6b81;
  transition: color 0.3s ease, transform 0.3s ease;
}
.custom-navbar {
  background-color: #121212;
  color: #fff;
  font-size: 1.4rem;
}

.custom-navbar .navbar-nav .nav-link,
.custom-navbar .navbar-toggler-icon,
.custom-navbar .navbar-brand {
  color: #ff6b81;
  margin-left: 2rem;
}

.custom-navbar .navbar-nav .nav-link:hover,
.custom-navbar .navbar-nav .nav-link:focus,
.custom-navbar .navbar-toggler-icon:focus,
.custom-navbar .navbar-toggler-icon:hover,
.custom-navbar .navbar-brand:hover,
.custom-navbar .navbar-brand:focus {
  color: #ff8c99;
}

.navbar-nav.ml-auto {
  flex-grow: 1;
}

.search-container {
  flex-grow: 1; /* Allows search form to fill available space */
  display: flex;
  align-items: center;
  gap: 10px; /* Space between search input and button */
  margin-left: 1rem; /* Ensures spacing from the navigation items */
  max-width: none;
}

.search-input {
  flex-grow: 1; /* Allows input to expand */
}

.search-button {
  border-radius: 20px; /* Rounded edges for button */
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    width: 100%; /* Full width for smaller screens */
  }

  .search-input,
  .search-button {
    width: 100%; /* Full width for input and button */
    margin-top: 0.5rem; /* Spacing for stacked layout */
  }
}

.custom-navbar .navbar-nav .nav-link,
.custom-navbar .navbar-toggler-icon,
.custom-navbar .navbar-brand {
  color: #ff6b81;
  transition: color 0.3s ease, transform 0.3s ease;
}

.custom-navbar .navbar-nav .nav-link:hover,
.custom-navbar .navbar-nav .nav-link:focus,
.custom-navbar .navbar-toggler-icon:focus,
.custom-navbar .navbar-toggler-icon:hover,
.custom-navbar .navbar-brand:hover,
.custom-navbar .navbar-brand:focus {
  color: #ff8c99;
  text-decoration: none;
  transform: scale(1.01);
}
</style>
```
