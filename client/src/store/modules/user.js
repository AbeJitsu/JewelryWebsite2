// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/user.js

import axios from "axios";
import router from "@/router";

export default {
  namespaced: true,

  state: {
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
    status: "",
    user: null,
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
      console.log("register action:", userData);
      commit("auth_request");
      try {
        const response = await axios.post("/api/auth/register", userData, {
          withCredentials: true,
        });
        commit("auth_success", response.data);
      } catch (err) {
        commit("auth_error");
        console.error("Registration error:", err);
        throw err;
      }
    },

    async login({ commit }, userCredentials) {
      console.log("login action:", userCredentials);
      commit("auth_request");
      try {
        const response = await axios.post("/api/auth/login", userCredentials, {
          withCredentials: true,
        });
        if (response.data.message === "Login successful") {
          commit("auth_success", response.data);
        } else {
          commit("auth_error");
          console.error("Login error:", response.data.error);
        }
      } catch (err) {
        commit("auth_error");
        console.error("Login error:", err);
        throw err;
      }
    },

    async logout({ commit }) {
      console.log("logout action");
      try {
        await axios.post("/api/auth/logout", {}, { withCredentials: true });
        commit("logout");

        if (router.currentRoute.meta.requiresAuth) {
          router.push({ name: "jewelry-showcase" });
        }
      } catch (err) {
        console.error("Logout error:", err);
      }
    },

    async fetchUserProfile({ commit }) {
      console.log("fetchUserProfile action");
      try {
        const response = await axios.get("/api/auth/user", {
          withCredentials: true,
        });
        commit("setUser", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },

    async tryAutoLogin({ commit }) {
      console.log("tryAutoLogin action");
      try {
        const response = await axios.get("/api/auth/user", {
          withCredentials: true,
        });
        commit("setUser", response.data);
      } catch (error) {
        console.error("Auto login error:", error);
      }
    },

    async checkLoginAndFetchUser({ dispatch }) {
      console.log("checkLoginAndFetchUser action");
      try {
        const response = await dispatch("tryAutoLogin");
        return response;
      } catch (error) {
        console.error("Auto login and fetch user error:", error);
        throw error;
      }
    },

    toggleModal({ commit }) {
      console.log("toggleModal action");
      commit("TOGGLE_MODAL");
    },
    toggleLogin({ commit }) {
      console.log("toggleLogin action");
      commit("TOGGLE_LOGIN");
    },
    updateLoginForm({ commit }, payload) {
      console.log("updateLoginForm action:", payload);
      commit("UPDATE_LOGIN_FORM", payload);
    },
    updateRegisterForm({ commit }, payload) {
      console.log("updateRegisterForm action:", payload);
      commit("UPDATE_REGISTER_FORM", payload);
    },
  },

  mutations: {
    auth_request(state) {
      console.log("auth_request mutation");
      state.status = "loading";
    },
    auth_success(state, userData) {
      console.log("auth_success mutation:", userData);
      state.status = "success";
      state.user = userData;
    },
    auth_error(state) {
      console.log("auth_error mutation");
      state.status = "error";
      state.user = null;
    },
    logout(state) {
      console.log("logout mutation");
      state.status = "";
      state.user = null;
    },
    setUser(state, user) {
      console.log("setUser mutation:", user);
      state.user = user;
      state.preferredFirstName = user.preferredFirstName;
    },
    TOGGLE_MODAL(state) {
      console.log("TOGGLE_MODAL mutation");
      state.showModal = !state.showModal;
    },
    TOGGLE_LOGIN(state) {
      console.log("TOGGLE_LOGIN mutation");
      state.isLogin = !state.isLogin;
    },
    UPDATE_LOGIN_FORM(state, { field, value }) {
      console.log("UPDATE_LOGIN_FORM mutation:", field, value);
      state.loginForm[field] = value;
    },
    UPDATE_REGISTER_FORM(state, { field, value }) {
      console.log("UPDATE_REGISTER_FORM mutation:", field, value);
      state.registerForm[field] = value;
    },
  },
};
