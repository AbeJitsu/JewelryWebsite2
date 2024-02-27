// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/user.js
import axios from "axios";

export default {
  namespaced: true,

  state: {
    status: "",
    user: null, // User profile information
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
        const response = await axios.post("/api/auth/login", userCredentials, {
          withCredentials: true,
        });
        console.log(response.data);
        commit("auth_success", response.data); // Pass the user data to the mutation
        // No need to separately fetch user profile if it's already obtained here
      } catch (err) {
        commit("auth_error");
        throw err; // Throw error to catch it in component
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

    // Optionally, create an action to fetch the user profile
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
      state.user = user; // Set the user profile information
    },
  },
};
