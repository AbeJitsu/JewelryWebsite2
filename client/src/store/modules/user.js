// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/user.js

import clientAuthService from "@/api/clientAuthService";
import router from "@/router";

let lastTryAutoLoginCall = 0;

export default {
  namespaced: true,
  state: {
    showModal: false,
    isLogin: true,
    loginForm: { email: "", password: "" },
    registerForm: {
      preferredFirstName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    status: "",
    user: null,
    token: null,
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    authStatus: (state) => state.status,
    user: (state) => state.user,
    isAdmin: (state) => state.user && state.user.role === "admin",
    preferredFirstName: (state) => state.registerForm.preferredFirstName,
  },
  actions: {
    async register({ commit }, userData) {
      commit("auth_request");
      try {
        const response = await clientAuthService.register(userData);
        if (response.message === "Registration successful") {
          commit("register_success");
          router.push({ name: "login" }); // Redirect to login page after successful registration
        } else {
          commit("auth_error");
        }
      } catch (err) {
        commit("auth_error");
        throw err;
      }
    },
    async login({ commit }, userCredentials) {
      commit("auth_request");
      try {
        const response = await clientAuthService.login(
          userCredentials.email,
          userCredentials.password
        );
        if (response.message === "Login successful") {
          commit("auth_success", response);
        } else {
          commit("auth_error");
        }
      } catch (err) {
        commit("auth_error");
        throw err;
      }
    },
    async logout({ commit }) {
      try {
        await clientAuthService.logout();
        commit("logout");
        router.push({ name: "jewelry-showcase" });
      } catch (err) {
        console.error("Logout error:", err);
      }
    },
    async fetchUserProfile({ commit }) {
      try {
        const response = await clientAuthService.tryAutoLogin();
        commit("setUser", response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    async tryAutoLogin({ commit }) {
      const now = Date.now();
      if (now - lastTryAutoLoginCall < 3000) {
        console.log("Vuex: Skipping tryAutoLogin call due to throttling");
        return;
      }
      lastTryAutoLoginCall = now;

      console.log("Vuex: Dispatching tryAutoLogin");
      try {
        const response = await clientAuthService.tryAutoLogin();
        if (response) {
          commit("setUser", response);
        } else {
          commit("auth_error");
        }
      } catch (error) {
        commit("auth_error");
      }
    },
    async checkLoginAndFetchUser({ dispatch }) {
      console.log("Vuex: Dispatching checkLoginAndFetchUser");
      return await dispatch("tryAutoLogin");
    },
    toggleModal({ commit }) {
      commit("TOGGLE_MODAL");
    },
    toggleLogin({ commit }) {
      commit("TOGGLE_LOGIN");
    },
    updateLoginForm({ commit }, payload) {
      commit("UPDATE_LOGIN_FORM", payload);
    },
    updateRegisterForm({ commit }, payload) {
      commit("UPDATE_REGISTER_FORM", payload);
    },
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, userData) {
      state.status = "success";
      state.user = userData;
      state.token = userData ? userData.token : null;
      console.log("User data after login:", state.user);
    },
    auth_error(state) {
      state.status = "error";
      state.user = null;
      state.token = null;
    },
    register_success(state) {
      state.status = "registered";
    },
    logout(state) {
      state.status = "";
      state.user = null;
      state.token = null;
    },
    setUser(state, user) {
      state.user = user;
      state.token = user.token;
    },
    TOGGLE_MODAL(state) {
      state.showModal = !state.showModal;
    },
    TOGGLE_LOGIN(state) {
      state.isLogin = !state.isLogin;
    },
    UPDATE_LOGIN_FORM(state, { field, value }) {
      state.loginForm[field] = value;
    },
    UPDATE_REGISTER_FORM(state, { field, value }) {
      state.registerForm[field] = value;
    },
  },
};
