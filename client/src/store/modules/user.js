// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/user.js
import axios from "axios";

export default {
  namespaced: true,

  state: {
    status: "", // Authentication status: '', 'loading', 'success', 'error'
    user: null, // User object for logged-in user (if needed)
  },

  getters: {
    isLoggedIn: (state) => !!state.user,
    authStatus: (state) => state.status,
    user: (state) => state.user,
  },

  actions: {
    async login({ commit }, userCredentials) {
      commit("auth_request");
      try {
        const resp = await axios.post("/api/login", userCredentials, {
          withCredentials: true,
        });
        const user = resp.data.user;
        commit("auth_success", user);
        // You might want to set axios defaults or perform other actions upon successful login
      } catch (err) {
        commit("auth_error", err);
        console.error("Login error:", err);
        // Optionally clear any relevant state or perform other cleanup actions
      }
    },

    async logout({ commit }) {
      try {
        await axios.post("/api/logout", {}, { withCredentials: true });
        commit("logout");
        // Again, you might want to clear axios defaults or perform other cleanup actions
      } catch (err) {
        console.error("Logout error:", err);
        // Handle any errors that occur during logout
      }
    },
  },

  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, user) {
      state.status = "success";
      state.user = user;
    },
    auth_error(state, err) {
      state.status = "error";
      // Consider also resetting the user state here
      console.error("Authentication error:", err);
    },
    logout(state) {
      state.status = "";
      state.user = null;
      // Reset additional state as necessary
    },
  },
};
