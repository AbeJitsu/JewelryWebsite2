<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/layout/AuthModal.vue -->

<template>
  <div>
    <b-modal v-model="showModal" @hide="resetForm" id="auth-modal">
      <template #modal-title>{{ isLogin ? "Login" : "Register" }}</template>
      <b-form @submit.prevent="isLogin ? loginUser() : registerUser()">
        <b-form-group
          :label="isLogin ? 'Email' : 'Preferred First Name'"
          :label-for="isLogin ? 'login-email' : 'register-first-name'"
        >
          <b-form-input
            :id="isLogin ? 'login-email' : 'register-first-name'"
            v-model="form.email"
            :type="isLogin ? 'email' : 'text'"
            required
            :placeholder="isLogin ? 'Enter email' : 'Preferred first name'"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password" label-for="login-password">
          <b-form-input
            id="login-password"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
            autocomplete="current-password"
          ></b-form-input>
        </b-form-group>

        <div v-if="!isLogin">
          <b-form-group
            label="Confirm Password"
            label-for="register-password-confirmation"
          >
            <b-form-input
              id="register-password-confirmation"
              v-model="form.passwordConfirmation"
              type="password"
              required
              placeholder="Confirm Password"
            ></b-form-input>
          </b-form-group>
        </div>

        <b-button type="submit" variant="primary">{{
          isLogin ? "Login" : "Register"
        }}</b-button>
        <b-button variant="link" @click="toggleForm">
          {{
            isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"
          }}
        </b-button>
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
      form: {
        email: "",
        password: "",
        passwordConfirmation: "", // Only used for registration
      },
    };
  },
  methods: {
    ...mapActions("user", ["login", "register"]),
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.resetForm();
    },
    loginUser() {
      this.login(this.form)
        .then(() => {
          this.$bvModal.hide("auth-modal");
          this.redirectAfterLogin();
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    },
    registerUser() {
      if (this.form.password !== this.form.passwordConfirmation) {
        alert("Passwords do not match.");
        return;
      }
      this.register(this.form)
        .then(() => {
          this.$bvModal.hide("auth-modal");
          this.resetForm();
          this.redirectAfterLogin();
        })
        .catch((error) => {
          console.error("Registration error:", error);
        });
    },
    resetForm() {
      this.form.email = "";
      this.form.password = "";
      this.form.passwordConfirmation = "";
    },
    redirectAfterLogin() {
      const redirect =
        this.$store.state.cart.postLoginRedirect || "/jewelry-showcase";
      this.$router.push({ name: redirect });
      this.$store.commit("cart/SET_POST_LOGIN_REDIRECT", null);
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
