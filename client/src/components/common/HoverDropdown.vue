<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/common/HoverDropdown.vue -->

<template>
  <div>
    <!-- Dropdown Menu -->
    <b-icon icon="key-fill"></b-icon>
    <b-dropdown
      class="account-orders-dropdown"
      size="md"
      text="Account & Orders"
      right
      toggle-class="custom-dropdown-toggle"
    >
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
      this.$refs.loginModal.showModal = true; // Set showModal to true
    },
    showRegisterModal() {
      this.$refs.registerModal.showModal = true; // Set showModal to true
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
.account-orders-dropdown >>> .custom-dropdown-toggle {
  color: black !important;
  background: #ff6b81 !important; /* Pink background */
  border: none !important;
}

.account-orders-dropdown >>> .custom-dropdown-toggle:hover {
  background: #ff8c99 !important; /* Slightly darker pink on hover */
}

.account-orders-dropdown >>> .dropdown-item {
  color: #67232e !important;
}

.account-orders-dropdown >>> .dropdown-item:hover {
  color: #37020d !important;
}
</style>
