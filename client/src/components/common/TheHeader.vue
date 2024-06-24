<template>
  <div class="header-container">
    <b-navbar type="darker" variant="darker" class="custom-navbar">
      <b-navbar-brand to="/jewelry-showcase" class="custom-brand-container">
        <span class="logo-text hover-effect d-none d-lg-inline"
          >Escape, Relax & Be Jeweled</span
        >
        <img
          :src="require('@/assets/images/logo.png')"
          alt="Logo"
          class="logo-image"
        />
      </b-navbar-brand>
      <div class="header-right">
        <div class="search-container">
          <b-form-input
            size="md"
            class="search-input"
            placeholder="Find an amazing ..."
          />
          <b-button size="md" class="search-button" type="submit">
            <b-icon icon="search" class="search-icon"></b-icon>
          </b-button>
        </div>
        <div class="user-actions-container">
          <b-nav-item v-if="isLoggedIn"
            >Welcome, {{ userPreferredName }}!</b-nav-item
          >
          <hover-dropdown
            class="account-orders-dropdown"
            @show-login-modal="showLoginModal"
            @show-register-modal="showRegisterModal"
            @show-account-modal="showAccountModal"
            @show-orders-modal="showOrdersModal"
            @show-wishlist-modal="showWishlistModal"
            @show-settings-modal="showSettingsModal"
            @show-help-center-modal="showHelpCenterModal"
            @show-profile-modal="showProfileModal"
          ></hover-dropdown>
          <b-nav-item class="cart-icon-container" @click="goToCart">
            <div>
              <div class="cart-icon-wrapper">
                <b-icon icon="cart-fill" class="cart-icon"></b-icon>
                <b-badge variant="danger" class="cart-item-count">{{
                  itemCount
                }}</b-badge>
              </div>
              <span class="cart-text d-none d-lg-inline">Cart</span>
            </div>
          </b-nav-item>
        </div>
      </div>
    </b-navbar>
    <login-modal ref="loginModal"></login-modal>
    <register-modal ref="registerModal"></register-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginModal from "@/components/auth/LoginModal.vue";
import RegisterModal from "@/components/auth/RegisterModal.vue";
import HoverDropdown from "@/components/common/HoverDropdown.vue";

export default {
  components: {
    LoginModal,
    RegisterModal,
    HoverDropdown,
  },
  computed: {
    ...mapGetters("user", ["isLoggedIn", "user"]),
    ...mapGetters("cart", ["itemCount"]),
    userPreferredName() {
      return this.user && this.user.preferredFirstName
        ? this.user.preferredFirstName
        : "";
    },
  },
  methods: {
    ...mapActions("user", [
      "logout",
      "fetchUserProfile",
      "checkLoginAndFetchUser",
    ]),
    ...mapActions("cart", ["fetchCart"]),
    showLoginModal() {
      this.$refs.loginModal.showModal = true;
    },
    showRegisterModal() {
      this.$refs.registerModal.showModal = true;
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
    showAccountModal() {
      // Logic to show Account Modal
    },
    showOrdersModal() {
      // Logic to show Orders Modal
    },
    showWishlistModal() {
      // Logic to show Wishlist Modal
    },
    showSettingsModal() {
      // Logic to show Settings Modal
    },
    showHelpCenterModal() {
      // Logic to show Help Center Modal
    },
    showProfileModal() {
      // Logic to show Profile Modal
    },
    goToAccount() {
      this.$router.push({ name: "account" });
    },
  },
  created() {
    this.checkLoginAndFetchUser()
      .then(() => {
        if (this.isLoggedIn) {
          this.fetchCart();
        }
      })
      .catch((error) => {
        console.error("Error during auto login and fetch user:", error);
      });
  },
  watch: {
    isLoggedIn(newValue) {
      if (newValue) {
        this.fetchUserProfile();
        this.fetchCart();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/sharedStyles.scss";

.custom-navbar {
  background-color: #121212;
  color: #fff;
  font-size: 1rem;

  .navbar-nav .nav-link,
  .navbar-toggler-icon,
  .navbar-brand {
    color: $primary;
  }

  .account-orders-dropdown .dropdown-toggle,
  .account-orders-dropdown .btn-link {
    color: #fff !important;
    background-color: $primary !important;

    &:hover {
      background-color: $hover-color !important;
    }
  }
}

.header-container {
  position: sticky;
  top: 0;
  z-index: 10;
}

.custom-brand-container {
  display: flex;
  align-items: center;
  gap: 1em;
}

.logo-image {
  height: 2.5rem; /* Ensure this height matches the search input and button */
  border-radius: 0.25rem;
}

.logo-text {
  font-family: "Tangerine", cursive;
  font-size: 2.1rem;
  font-weight: 900;
  color: $primary;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.359);
  display: none; /* Hidden by default */
  @extend .hover-effect;

  @media (min-width: 992px) {
    display: inline; /* Displayed on large screens */
  }
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
  flex-grow: 1;
  max-width: 500px;
  min-width: 300px;
  // border: 1px solid #e4e4e4;
  border-radius: 0.25rem;
  background-color: #fff; /* Ensure background matches the search button */
  height: 2.5rem; /* Set consistent height */
}

.search-input {
  flex-grow: 1;
  border: none !important;
  border-radius: 0.25rem !important;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;

  padding: 0.375rem 0.75rem;
  height: 100%; /* Match the container height */
}

.search-button {
  background-color: white;
  border: none !important;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  height: 100%; /* Match the container height */
  display: flex;
  background-color: white;

  align-items: center;
  justify-content: center;
}

.search-icon {
  color: $primary;
}

.user-actions-container {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  transition: transform 0.3s ease;
}

.cart-icon {
  transform: scale(1.1);
  font-size: 1.6em;
  position: relative;
}

.cart-item-count {
  position: absolute;
  background-color: transparent;
  color: #ffffff;
  top: 4px;
  right: 9px;
  transform: translate(50%, -50%);
  font-size: 0.9em;
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
  margin-left: 10px;
  height: 100%; /* Match the other elements' height */
  display: flex;
  align-items: center;
}
</style>
