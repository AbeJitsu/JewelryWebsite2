<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/common/HoverDropdown.vue -->

<template>
  <div>
    <!-- Dropdown Menu with integrated key icon -->
    <b-dropdown
      class="account-orders-dropdown"
      size="md"
      toggle-class="custom-dropdown-toggle hover-effect"
      left
    >
      <template #button-content>
        <b-icon icon="key-fill" class="dropdown-icon"></b-icon>
        Account & Orders
      </template>
      <b-dropdown-item @click="showLoginModal">Login</b-dropdown-item>
      <b-dropdown-item @click="showRegisterModal">Register</b-dropdown-item>
      <b-dropdown-item @click="showAccountModal">Account</b-dropdown-item>
      <b-dropdown-item @click="showOrdersModal">Orders</b-dropdown-item>
      <b-dropdown-item @click="showWishlistModal">Wishlist</b-dropdown-item>
      <b-dropdown-item @click="showSettingsModal">Settings</b-dropdown-item>
      <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
      <b-dropdown-item @click="showHelpCenterModal"
        >Help Center</b-dropdown-item
      >
      <b-dropdown-item @click="showProfileModal">Profile</b-dropdown-item>
    </b-dropdown>
    <login-modal ref="loginModal"></login-modal>
    <register-modal ref="registerModal"></register-modal>
  </div>
</template>

<script>
import LoginModal from "@/components/auth/LoginModal.vue";
import RegisterModal from "@/components/auth/RegisterModal.vue";
import { mapActions } from "vuex";

export default {
  components: {
    LoginModal,
    RegisterModal,
  },
  methods: {
    ...mapActions("user", ["logout"]),
    showLoginModal() {
      this.$refs.loginModal.showModal = true;
    },
    showRegisterModal() {
      this.$refs.registerModal.showModal = true;
    },
    showAccountModal() {
      this.$emit("show-account-modal");
    },
    showOrdersModal() {
      this.$emit("show-orders-modal");
    },
    showWishlistModal() {
      this.$emit("show-wishlist-modal");
    },
    showSettingsModal() {
      this.$emit("show-settings-modal");
    },
    async signOut() {
      try {
        await this.logout();
        this.$router.push("/jewelry-showcase");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    showHelpCenterModal() {
      this.$emit("show-help-center-modal");
    },
    showProfileModal() {
      this.$emit("show-profile-modal");
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/sharedStyles.scss";

.account-orders-dropdown >>> .custom-dropdown-toggle {
  color: black !important;
  background: #ff6b81 !important; /* Pink background */
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Ensure consistent height */
  transition: color 0.3s ease-in-out, text-shadow 0.3s ease-in-out,
    transform 0.3s ease-in-out; /* Add transition effects */

  &:hover {
    color: lighten(
      $primary,
      50%
    ) !important; /* Lighten the primary color by 10% */
    text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.2) !important; /* Increase the text shadow */
    transform: scale(1.02) !important; /* Slightly increase the size */
  }
}

.account-orders-dropdown >>> .dropdown-icon {
  margin-right: 0.5rem; /* Space between icon and text */
}

.account-orders-dropdown >>> .dropdown-item {
  color: #67232e !important;
}

.account-orders-dropdown >>> .dropdown-item:hover {
  color: #37020d !important;
}
</style>
