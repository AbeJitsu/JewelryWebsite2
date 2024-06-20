<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/common/HoverDropdown.vue -->

<template>
  <div
    class="hover-dropdown"
    v-show="isDropdownVisible"
    @mouseleave="hideDropdown"
  >
    <div class="dropdown-content">
      <b-button @click="showSignInModal">Sign In</b-button>
      <b-button @click="showRegisterModal">Register</b-button>
      <b-link @click="navigateTo('/account')">Account</b-link>
      <b-link @click="navigateTo('/orders')">Orders</b-link>
      <b-link @click="navigateTo('/history')">Browsing History</b-link>
      <!-- Add more links as needed -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownVisible: false,
    };
  },
  methods: {
    showSignInModal() {
      this.$emit("show-sign-in-modal");
    },
    showRegisterModal() {
      this.$emit("show-register-modal");
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
    showDropdown() {
      this.isDropdownVisible = true;
    },
  },
};
</script>

<style scoped>
.hover-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  z-index: 1000;
  display: none;
}
.hover-dropdown .dropdown-content {
  padding: 15px;
}
.hover-dropdown .dropdown-content b-button,
.hover-dropdown .dropdown-content b-link {
  display: block;
  margin-bottom: 10px;
}
</style>
