//Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/user.js

import axios from "axios";

// Initial state
const state = {
  status: "", // Authentication status: '', 'loading', 'success', 'error'
  user: null, // User object for logged-in user (if needed)
};

// Getters
const getters = {
  isLoggedIn: (state) => !!state.user,
  authStatus: (state) => state.status,
  user: (state) => state.user,
};

// Actions
const actions = {
  // Perform user login
  login({ commit }, userCredentials) {
    commit("auth_request");
    axios
      .post("/api/login", userCredentials, { withCredentials: true }) // Ensure withCredentials is true to send cookies
      .then((resp) => {
        const user = resp.data.user; // Assuming the server responds with user details
        commit("auth_success", user);
      })
      .catch((err) => {
        commit("auth_error", err);
        console.error(err);
      });
  },

  // Logout user
  logout({ commit }) {
    axios
      .post("/api/logout", {}, { withCredentials: true }) // Ensure withCredentials is true to send cookies
      .then(() => {
        commit("logout");
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

// Mutations
const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, user) {
    state.status = "success";
    state.user = user; // Adjust based on actual response
  },
  auth_error(state, err) {
    state.status = "error";
    console.error("Login error:", err);
  },
  logout(state) {
    state.status = "";
    state.user = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
