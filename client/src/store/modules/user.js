// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/user.js
import axios from "axios";

export default {
  namespaced: true,

  state: {
    status: "",
    user: null,
  },

  getters: {
    isLoggedIn: (state) => !!state.user,
    authStatus: (state) => state.status,
    user: (state) => state.user,
  },

  actions: {
    async register({ commit }, userData) {
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
      try {
        await axios.post("/api/auth/logout", {}, { withCredentials: true });
        commit("logout");
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
  },

  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, userData) {
      state.status = "success";
      state.user = userData;
    },
    auth_error(state) {
      state.status = "error";
      state.user = null;
    },
    logout(state) {
      state.status = "";
      state.user = null;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
};
