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

        <div
          class="header-right d-flex align-items-center justify-content-end flex-grow-1"
        >
          <div class="search-container d-flex flex-grow-1 mx-2">
            <b-form-input
              size="md"
              class="me-2 flex-grow-1"
              placeholder="Find an amazing ..."
            />
            <b-button size="md" type="submit">Search</b-button>
          </div>
          <div class="user-actions-container d-flex align-items-center">
            <b-nav-item v-if="!isLoggedIn" @click="showAuthModal">
              <b-icon icon="key-fill"></b-icon> Shine In
            </b-nav-item>
            <b-nav-item v-else @click="performLogout">
              <b-icon icon="box-arrow-right"></b-icon> Shine Out
            </b-nav-item>
            <b-nav-item @click="goToAccount">
              <b-icon icon="person-circle"></b-icon> Account & Orders
            </b-nav-item>
            <b-nav-item class="cart-icon-container" @click="goToCart">
              <div class="cart-container">
                <b-icon icon="cart-fill" class="cart-icon"></b-icon>
                <b-badge variant="danger" class="cart-item-count">{{
                  itemCount
                }}</b-badge>
                <span class="cart-text">Cart</span>
              </div>
            </b-nav-item>
          </div>
        </div>
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
    ...mapGetters("user", ["isLoggedIn"]),
    ...mapGetters("cart", ["itemCount"]),
  },
  methods: {
    ...mapActions("user", {
      logout: "logout",
    }),
    showAuthModal() {
      this.$bvModal.show("auth-modal");
    },
    async performLogout() {
      try {
        await this.logout();
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    goToCart() {
      this.$router.push({ name: "cart" });
    },
  },
};
</script>

<style scoped>
.custom-brand-container {
  display: flex;
  align-items: center;
  gap: 1em;
}

.logo-image {
  height: 2em;
  border-radius: 25%;
}

.logo-text {
  color: #fff;
  font-family: "Tangerine", cursive;
  font-size: 2rem;
  font-weight: 900;
  color: #ff6b81;
}

.custom-navbar {
  background-color: #121212;
  color: #fff;
  font-size: 1.4rem;
}

/* Adjusting the navbar links and icons */
.custom-navbar .navbar-nav .nav-link,
.custom-navbar .navbar-toggler-icon,
.custom-navbar .navbar-brand,
.user-actions-container .nav-link {
  color: #ff6b81;
}

/* Hover effects */
.custom-navbar .navbar-nav .nav-link:hover,
.custom-navbar .navbar-nav .nav-link:focus,
.custom-navbar .navbar-toggler-icon:focus,
.custom-navbar .navbar-toggler-icon:hover,
.custom-navbar .navbar-brand:hover,
.custom-navbar .navbar-brand:focus,
.user-actions-container .nav-link:hover,
.user-actions-container .nav-link:focus {
  color: #ff8c99;
  text-decoration: none;
  transform: scale(1.01);
}

/* Ensuring no list-style for navbar items */
.custom-navbar b-navbar-nav ul,
.custom-navbar b-navbar-nav li,
.custom-navbar li {
  list-style-type: none !important;
  display: inline-block !important;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.search-container {
  display: flex;
  flex-grow: 1;
  margin-right: 0.5rem;
  align-items: center;
}

.search-container .flex-grow-1 {
  flex-grow: 1;
}

.user-actions-container {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap; /* Ensures the text doesn't wrap */
}

.cart-icon-container {
  position: relative;
}

.cart-icon {
  transform: scale(1.1);
}

.cart-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.4em;
}

.cart-text {
  margin-left: 10px; /* Space from the cart icon */
  font-size: 0.7em;
}

.cart-item-count {
  background-color: transparent;
  color: #ffffff;
  position: absolute;
  top: 15px;
  right: 74px;
  font-size: 0.5em;
}

.cart-item-count:hover {
  background-color: #ff8c99;
}
</style>
