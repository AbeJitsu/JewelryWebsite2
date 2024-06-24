<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/auth/LoginModal.vue -->

<template>
  <!-- Login Modal -->
  <b-modal v-model="showModal" @hide="resetForm" id="login-modal">
    <template #modal-title>Login</template>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <b-form @submit.prevent="loginUser">
      <b-form-group label="Email" label-for="login-email">
        <b-form-input
          id="login-email"
          v-model="loginForm.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="login-password">
        <b-form-input
          id="login-password"
          v-model="loginForm.password"
          type="password"
          required
          placeholder="Password"
          autocomplete="current-password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      showModal: false,
      loginForm: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    async loginUser() {
      try {
        console.log("Attempting to login with:", this.loginForm);
        const response = await this.login(this.loginForm);
        console.log("Login response:", response);
        this.$bvModal.hide("login-modal");
        this.errorMessage = "";

        const redirectPath = this.$store.state.cart.postLoginRedirect;
        if (redirectPath) {
          this.$router.push(redirectPath);
          this.$store.commit("cart/SET_POST_LOGIN_REDIRECT", null);
        } else {
          this.$router.push("/jewelry-showcase");
        }
      } catch (error) {
        console.error("Login error:", error);
        this.errorMessage =
          error.response?.data?.error || "Login failed. Please try again.";
      }
    },
    resetForm() {
      this.loginForm = {
        email: "",
        password: "",
      };
      this.errorMessage = "";
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/sharedStyles.scss";

.b-modal .modal-header,
.b-modal .modal-footer {
  background-color: #121212;
  color: #fff;
  border-bottom: 1px solid #ff6b81;
}

.b-modal .modal-footer {
  display: flex;
  justify-content: flex-end;
}

.b-modal .modal-body {
  background-color: #121212;
  color: #fff;
}

.b-modal .modal-content {
  border-color: #ff6b81;
}

.b-modal .b-button {
  border-radius: 0.25rem;
  background-color: #ff6b81 !important;
  border: none;
  color: #fff;
}

.b-modal .b-button:hover,
.b-modal .b-button:focus {
  background-color: #ff8c99 !important;
  color: #fff;
}

.b-modal .b-form-input,
.b-modal .b-form-textarea {
  background-color: #2c2f33;
  border: 1px solid #ff6b81;
  color: #fff;
}

.b-modal .b-form-input:focus,
.b-modal .b-form-textarea:focus {
  border-color: #ff8c99;
  box-shadow: 0 0 0 0.2rem rgba(255, 107, 129, 0.25);
}
</style>
