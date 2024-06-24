<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/auth/RegisterModal.vue -->

<template>
  <!-- Registration Modal -->
  <b-modal v-model="showModal" @hide="resetForm" id="register-modal">
    <template #modal-title>Register</template>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <b-form @submit.prevent="registerUser">
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
      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      showModal: false,
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
    ...mapActions("user", ["register"]),
    async registerUser() {
      if (
        this.registerForm.password !== this.registerForm.passwordConfirmation
      ) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      try {
        await this.register(this.registerForm);
        this.$bvModal.hide("register-modal");
        this.errorMessage = "";
        this.resetForm();
        if (this.$router.currentRoute.path !== "/jewelry-showcase") {
          this.$router.push("/jewelry-showcase");
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error ||
          "Registration failed. Please try again.";
      }
    },
    resetForm() {
      this.registerForm = {
        preferredFirstName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
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
