<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="darker"
      variant="darker"
      class="custom-navbar"
    >
      <b-navbar-brand to="/jewelry-showcase" class="custom-brand-container">
        <!-- <img
          :src="require('@/assets/logo.png')"
          alt="Logo"
          class="logo-image"
        /> -->
        <span class="logo-text">Escape, Relax & Be Jeweled</span>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
          <b-nav-item :to="{ name: 'jewelry-showcase' }">Shop</b-nav-item>
        </b-navbar-nav> -->

        <div
          class="header-right d-flex align-items-center justify-content-end flex-grow-1"
        >
          <div
            class="search-container d-flex flex-grow-1 mx-2 position-relative"
          >
            <b-form-input
              size="md"
              class="search-input"
              placeholder="Find an amazing ..."
            />
            <b-button size="md" class="search-button" type="submit">
              <b-icon icon="search" class="search-icon"></b-icon>
            </b-button>
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
              <div>
                <div class="cart-icon-wrapper">
                  <b-icon icon="cart-fill" class="cart-icon"></b-icon>
                  <b-badge variant="danger" class="cart-item-count">{{
                    itemCount
                  }}</b-badge>
                </div>
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
  font-size: 2.5rem;
  font-weight: 900;
  color: #ff6b81;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.359);
}

.logo-text:hover {
  color: #ff8c99;
  text-decoration: none;
  transform: scale(1.01);
  transition: transform 0.3s ease;
}

.custom-navbar {
  background-color: #121212;
  color: #fff;
  font-size: 1.6rem;
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
  transition: transform 0.1s ease;
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
  position: relative;
  align-items: center;
  flex-grow: 1;
  border: 1px solid #ced4da; /* Border color */
  border-radius: 0.25rem; /* Apply border radius to the container */
}

.search-input {
  flex-grow: 1;
  border: none;
  border-top-left-radius: 0.25rem; /* Round top-left corner */
  border-bottom-left-radius: 0.25rem; /* Round bottom-left corner */
}

.search-button {
  position: absolute;
  right: 1px;
  top: 5;
  border: none;
  background-color: white;
  padding: 0.375rem 0.75rem;
  border-top-right-radius: 0.25rem; /* Round top-right corner */
  border-bottom-right-radius: 0.25rem; /* Round bottom-right corner */
}

.search-icon {
  color: #ff6b81;
}

.user-actions-container {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap; /* Ensures the text doesn't wrap */
}

.cart-icon-container {
  display: flex;
  align-items: center;
}

.cart-icon-wrapper {
  position: relative;
  display: inline-block;
  gap: 5px;
  cursor: pointer;
  transition: transform 0.3s ease; /* Apply transition here */
}

.cart-icon {
  transform: scale(1.1);
  font-size: 1.5em;
  position: relative;
}

.cart-item-count {
  position: absolute;
  background-color: transparent;
  color: #ffffff;
  top: 17px;
  right: 15px;
  transform: translate(50%, -50%);
  font-size: 0.6em;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0 4px;
  box-sizing: border-box;
  background-color: transparent;
}

.cart-text {
  margin-left: 10px; /* Space from the cart icon */
}
</style>
