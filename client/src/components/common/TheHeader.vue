<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/common/TheHeader.vue -->

<template>
  <div class="header-container">
    <b-navbar type="darker" variant="darker" class="custom-navbar">
      <div class="brand-container">
        <b-navbar-brand to="/jewelry-showcase">
          <div class="logo-content">
            <span class="logo-text hover-effect d-none d-lg-inline">
              Escape, Relax & Be Jeweled
            </span>
            <img
              :src="require('@/assets/images/logo.png')"
              alt="Logo"
              class="logo-image"
            />
          </div>
        </b-navbar-brand>
      </div>
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
        <div class="welcome-account-container">
          <b-nav-item v-if="isLoggedIn" class="mx-3">
            Welcome, {{ userPreferredName }}!
          </b-nav-item>
          <hover-dropdown
            class="account-orders-dropdown"
            :dropdownText="dropdownText"
            @show-login-modal="showLoginModal"
            @show-register-modal="showRegisterModal"
            @show-account-modal="showAccountModal"
            @show-orders-modal="showOrdersModal"
            @show-wishlist-modal="showWishlistModal"
            @show-settings-modal="showSettingsModal"
            @show-help-center-modal="showHelpCenterModal"
            @show-profile-modal="showProfileModal"
          ></hover-dropdown>
        </div>
        <div class="cart-container">
          <b-nav-item class="cart-icon-container" @click="goToCart">
            <div class="cart-icon-wrapper">
              <b-icon icon="cart-fill" class="cart-icon"></b-icon>
              <b-badge variant="danger" class="cart-item-count">
                {{ itemCount }}
              </b-badge>
            </div>
            <span class="cart-text d-none d-lg-inline">Cart</span>
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
  data() {
    return {
      dropdownText: "Account & Orders",
    };
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
    updateDropdownText() {
      this.dropdownText =
        window.innerWidth <= 768 ? "Account" : "Account & Orders";
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
  mounted() {
    this.updateDropdownText();
    window.addEventListener("resize", this.updateDropdownText);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateDropdownText);
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
  // display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0 1rem;
  // width: 100%;
  // box-sizing: border-box;
}

.brand-container {
  display: flex;
  align-items: center;
  margin-left: 0;
  margin-right: 1rem;
}

.logo-content {
  display: flex;
  align-items: center;
  justify-content: center; /* Center the logo-content */
}

.logo-image {
  height: 2.5rem;
  width: auto;
  border-radius: 0.25rem;
  margin-left: 1.9rem;
}

.logo-text {
  font-family: "Tangerine", cursive;
  font-size: 2.1rem;
  font-weight: 900;
  color: $primary;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.359);
  margin-left: 0.1em;
  display: none;
  @extend .hover-effect;

  @media (min-width: 992px) {
    display: inline;
  }
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
  flex-grow: 1;
  border-radius: 0.25rem;
  background-color: #fff;
  height: 2.5rem;
  max-width: 45rem;
  min-width: 25rem;
  margin-left: 0.1rem;
}

.search-input {
  flex-grow: 1;
  border: none !important;
  border-radius: 0.25rem !important;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  height: 100%;
  min-width: 10rem;
}

.search-button {
  background-color: white;
  border: none !important;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  color: $primary;
}

.welcome-account-container {
  display: flex;
  align-items: center;
  flex-wrap: nowrap; /* Prevent wrapping */
  white-space: nowrap; /* Prevent wrapping */

  b-nav-item {
    list-style: none !important;
    display: flex;
    align-items: center;
  }

  li {
    list-style: none !important;

    // Ensure marker is not displayed
    &::marker {
      content: "";
    }
  }
}

.cart-container {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.cart-icon-container {
  list-style: none !important;
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
  margin-left: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
}

b-nav-item {
  list-style: none !important;
}

@media (max-width: 992px) {
  .logo-text {
    display: none;
  }

  .search-container {
    display: flex;
    align-items: center;
    position: relative;
    flex-grow: 1;
    max-width: 600px;
    min-width: 200px;
    border-radius: 0.25rem;
    background-color: #fff;
    height: 2.5rem;
    margin-left: 5rem;
  }

  .header-right {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    flex-wrap: nowrap;
  }

  .account-orders-dropdown {
    flex-wrap: nowrap;
    white-space: nowrap;
  }
}

@media (max-width: 768px) {
  .header-right {
    flex-direction: row;
    align-items: center;
  }

  .search-container {
    flex-grow: 1;
  }

  .account-orders-dropdown {
    max-width: 100px;
  }
}
</style>
