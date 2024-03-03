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
          <div class="search-container search-container-custom">
            <b-form-input
              size="md"
              class="flex-grow-1"
              placeholder="Find an amazing ..."
            />
            <b-button size="md" class="ml-2" type="submit">Search</b-button>
          </div>
          <div class="user-actions-container">
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
      this.$router.push({ name: "cart" }); // Adjust if your cart route has a different name
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

.search-container-custom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
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
  margin-left: 1rem;
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

.user-actions-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-icon-container {
  position: relative;
}

.cart-container {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.5em;
}

.cart-icon {
  transform: scale(1.15);
}

.cart-text {
  margin-left: 10px;
  font-size: 0.7em;
}

.cart-container:hover {
  transform: scale(1.03);
}

.cart-item-count {
  background-color: transparent;
  color: #ffffff;
  position: absolute;
  top: 17px;
  right: 71px;
  font-size: 1rem;
}

.cart-item-count:hover {
  background-color: #ff8c99;
}
</style>
