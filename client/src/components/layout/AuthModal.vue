<!-- Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/layout/AuthModal.vue -->

<template>
  <div>
    <!-- Modal for authentication -->
    <b-modal v-model="showModal" @hide="resetForm" id="auth-modal">
      <!-- Modal Title -->
      <template #modal-title>{{ isLogin ? "Login" : "Register" }}</template>

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
          ></b-form-input>
        </b-form-group>
        <!-- Login Button -->
        <b-button type="submit" variant="primary">Login</b-button>
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
    };
  },
  methods: {
    ...mapActions("user", ["login", "register"]),
    loginUser() {
      try {
        this.login(this.loginForm);
        this.$bvModal.hide("auth-modal");
        this.resetForm();
        if (this.$router.currentRoute.path !== "/jewelry-showcase") {
          this.$router.push("/jewelry-showcase");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    resetForm() {
      this.loginForm = { email: "", password: "" };
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
