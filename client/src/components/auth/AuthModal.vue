<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/auth/AuthModal.vue -->

<template>
  <div>
    <!-- Authentication Modal -->
    <b-modal v-model="showModal" @hide="resetForm" id="auth-modal">
      <template #modal-title>{{ isLogin ? "Login" : "Register" }}</template>

      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

      <!-- Login Form -->
      <b-form v-if="isLogin" @submit.prevent="loginUser">
        <!-- Email Input -->
        <b-form-group label="Email" label-for="login-email">
          <b-form-input
            id="login-email"
            v-model="loginForm.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <!-- Password Input -->
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

        <!-- Toggle to Registration Form -->
        <b-button variant="link" @click="toggleForm"
          >Don't have an account? Register</b-button
        >
      </b-form>

      <!-- Registration Form -->
      <b-form v-else @submit.prevent="registerUser">
        <!-- Name Input -->
        <b-form-group
          label="Preferred First Name"
          label-for="register-first-name"
        >
          <b-form-input
            id="register-first-name"
            v-model="registerForm.preferredFirstName"
            required
            placeholder="Preferred first name"
          ></b-form-input>
        </b-form-group>
        <!-- Email Input -->
        <b-form-group label="Email" label-for="register-email">
          <b-form-input
            id="register-email"
            v-model="registerForm.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <!-- Password Input -->
        <b-form-group label="Password" label-for="register-password">
          <b-form-input
            id="register-password"
            v-model="registerForm.password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-form-group>
        <!-- Confirm Password Input -->
        <b-form-group
          label="Confirm Password"
          label-for="register-password-confirmation"
        >
          <b-form-input
            id="register-password-confirmation"
            v-model="registerForm.passwordConfirmation"
            type="password"
            required
            placeholder="Confirm Password"
          ></b-form-input>
        </b-form-group>
        <!-- Register Button -->
        <b-button type="submit" variant="primary">Register</b-button>
        <!-- Toggle to Login Form -->
        <b-button variant="link" @click="toggleForm"
          >Already have an account? Login</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      showModal: false,
      isLogin: true,
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        preferredFirstName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("user", ["login", "register"]),
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.resetForm();
    },

    async loginUser() {
      try {
        console.log("Attempting to login with:", this.loginForm);
        const response = await this.login(this.loginForm);
        console.log("Login response:", response);
        this.$bvModal.hide("auth-modal");
        this.errorMessage = ""; // Clear any previous error message

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
    async registerUser() {
      if (
        this.registerForm.password !== this.registerForm.passwordConfirmation
      ) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      try {
        await this.register(this.registerForm);
        this.$bvModal.hide("auth-modal");
        this.errorMessage = ""; // Clear any previous error message
        this.resetForm();
        if (this.$router.currentRoute.path !== "/jewelry-showcase") {
          this.$router.push("/jewelry-showcase");
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.errorMessage =
          error.response?.data?.error ||
          "Registration failed. Please try again.";
      }
    },

    resetForm() {
      this.loginForm = { email: "", password: "" };
      this.registerForm = {
        preferredFirstName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      };
      this.errorMessage = ""; // Clear any previous error message
    },
  },
};
</script>

<style scoped>
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
  border-radius: 20px;
  background-color: #ff6b81 !important; /* Using !important to override Bootstrap styles */
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

@media (max-width: 768px) {
  .b-modal .modal-header,
  .b-modal .modal-footer,
  .b-modal .modal-body {
    padding: 20px;
  }

  .b-modal .b-button {
    margin-top: 10px;
    width: 100%;
  }
}

.b-modal .b-button-primary,
.b-modal .b-button-primary:hover,
.b-modal .b-button-primary:focus {
  background-color: #ff6b81 !important;
  border-color: #ff6b81 !important;
  color: #fff !important;
}
</style>
