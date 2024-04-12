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
      commit("setAuthRequest");
      try {
        const response = await axios.post("/api/auth/register", userData, {
          withCredentials: true,
        });
        commit("setAuthSuccess", response.data);
      } catch (err) {
        commit("setAuthError", err);
        console.error("Registration error:", err);
        throw err;
      }
    },

    async login({ commit }, userCredentials) {
      commit("setAuthRequest");
      try {
        const response = await axios.post("/api/auth/login", userCredentials, {
          withCredentials: true,
        });
        if (response.data.message === "Login successful") {
          commit("setAuthSuccess", response.data);
        } else {
          commit("setAuthError", response.data.error);
          console.error("Login error:", response.data.error);
        }
      } catch (err) {
        commit("setAuthError", err);
        console.error("Login error:", err);
        throw err;
      }
    },

    async logout({ commit }) {
      try {
        await axios.post("/api/auth/logout", {}, { withCredentials: true });
        commit("clearUserData");
        if (router.currentRoute.meta.requiresAuth) {
          router.push({ name: "jewelry-showcase" });
        }
      } catch (err) {
        console.error("Logout error:", err);
      }
    },

    async fetchUserProfile({ commit }) {
      try {
        const response = await axios.get("/api/auth/user", {
          withCredentials: true,
        });
        commit("setUser", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },

    toggleModal({ commit }) {
      commit("toggleModal");
    },

    toggleLogin({ commit }) {
      commit("toggleLogin");
    },

    updateLoginForm({ commit }, payload) {
      commit("updateLoginForm", payload);
    },

    updateRegisterForm({ commit }, payload) {
      commit("updateRegisterForm", payload);
    },

    // Auto login action
    tryAutoLogin({ commit }) {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        commit("setUser", userData);
      }
    },
  },

  mutations: {
    setAuthRequest(state) {
      state.status = "loading";
    },
    setAuthSuccess(state, userData) {
      state.status = "success";
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },
    setAuthError(state, error) {
      state.status = "error";
      state.user = null;
      console.error("Auth error:", error);
    },
    clearUserData(state) {
      state.status = "";
      state.user = null;
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
    },
    setUser(state, user) {
      state.user = user;
    },
    toggleModal(state) {
      state.showModal = !state.showModal;
    },
    toggleLogin(state) {
      state.isLogin = !state.isLogin;
    },
    updateLoginForm(state, { field, value }) {
      state.loginForm[field] = value;
    },
    updateRegisterForm(state, { field, value }) {
      state.registerForm[field] = value;
    },
  },
};
