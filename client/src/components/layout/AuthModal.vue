<!-- Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/layout/AuthModal.vue -->

<template>
  <div>
    <!-- AuthModal Component -->
    <b-modal v-model="showModal" @hide="resetForm" id="auth-modal">
      <template #modal-title>
        {{ isLogin ? "Login" : "Register" }}
      </template>

      <!-- Login Form -->
      <b-form v-if="isLogin" @submit.prevent="loginUser">
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
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>

      <!-- Register Form -->
      <b-form v-else @submit.prevent="registerUser">
        <b-form-group
          label="Preferred First Name"
          label-for="register-first-name"
        >
          <b-form-input
            id="register-first-name"
            v-model="registerForm.firstName"
            required
            placeholder="Preferred first name"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Email" label-for="register-email">
          <b-form-input
            id="register-email"
            v-model="registerForm.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="register-password">
          <b-form-input
            id="register-password"
            v-model="registerForm.password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Register</b-button>
      </b-form>

      <template #modal-footer>
        <div class="w-100 text-center">
          <p v-if="isLogin">
            Don't have an account? <b-link @click="toggleForm">Register</b-link>
          </p>
          <p v-else>
            Already have an account? <b-link @click="toggleForm">Login</b-link>
          </p>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      showModal: false,
      isLogin: true, // Toggle between login and registration
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        firstName: "", // Changed from username to firstName
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("user", {
      performLogin: "login", // Renaming for clarity
      performRegister: "register", // Renaming for clarity
    }),
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.resetForm();
    },
    async loginUser() {
      try {
        await this.performLogin(this.loginForm);
        this.$bvModal.hide("auth-modal");
        if (this.$router.currentRoute.path !== "/jewelry-showcase") {
          this.$router.replace("/jewelry-showcase");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    async registerUser() {
      try {
        await this.performRegister(this.registerForm);
        this.$bvModal.hide("auth-modal");
        if (this.$router.currentRoute.path !== "/jewelry-showcase") {
          this.$router.replace("/jewelry-showcase");
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    resetForm() {
      this.loginForm = { email: "", password: "" };
      this.registerForm = { firstName: "", email: "", password: "" };
    },
  },
};
</script>

<style scoped>
/* Modal styling inspired by TheHeader component */
.modal-header,
.modal-footer {
  background-color: #121212; /* Harmonize with the custom navbar */
  color: #fff;
  border-bottom: 1px solid #ff6b81; /* Soft pink accent line */
}

.modal-body {
  background-color: #121212;
  color: #fff;
}

.b-modal .modal-content {
  border-color: #ff6b81; /* Soft pink border for the modal */
}

.b-button {
  border-radius: 20px; /* Rounded edges for buttons, consistent with search button */
  background-color: #ff6b81; /* Soft pink background for buttons */
  border: none; /* Remove default border */
  color: #fff; /* White text on buttons */
}

.b-button:hover,
.b-button:focus {
  background-color: #ff8c99; /* Lighter pink on hover/focus */
  color: #fff; /* Maintain white text */
}

.b-form-input,
.b-form-textarea {
  background-color: #2c2f33; /* Slightly lighter than navbar for contrast */
  border: 1px solid #ff6b81; /* Soft pink border */
  color: #fff; /* White text for input */
}

.b-form-input:focus,
.b-form-textarea:focus {
  border-color: #ff8c99; /* Lighter pink when focused */
  box-shadow: 0 0 0 0.2rem rgba(255, 107, 129, 0.25); /* Soft pink glow */
}

/* Adjustments for smaller screens */
@media (max-width: 768px) {
  .modal-header,
  .modal-footer,
  .modal-body {
    padding: 20px; /* Increased padding for better touch interaction */
  }

  .b-button {
    margin-top: 10px; /* Additional spacing above buttons */
    width: 100%; /* Full width buttons for easier interaction */
  }
}
</style>
