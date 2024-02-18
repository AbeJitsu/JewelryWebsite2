import axios from "axios";

// Initial state
const state = {
  status: "", // Authentication status: '', 'loading', 'success', 'error'
  token: localStorage.getItem("token") || "", // JWT token from localStorage
  user: {}, // User object for logged-in user
};

// Getters
const getters = {
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  user: (state) => state.user,
};

// Actions
const actions = {
  // Perform user login
  login({ commit }, userCredentials) {
    commit("auth_request");
    axios
      .post("/api/login", userCredentials)
      .then((resp) => {
        const token = resp.data.token;
        const user = resp.data.user;
        localStorage.setItem("token", token); // Store the token in localStorage
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", token, user);
      })
      .catch((err) => {
        commit("auth_error");
        localStorage.removeItem("token"); // If login fails, remove any token from localStorage
        console.error(err);
      });
  },

  // Logout user
  logout({ commit }) {
    commit("logout");
    localStorage.removeItem("token"); // Remove token from localStorage
    delete axios.defaults.headers.common["Authorization"];
  },
};

// Mutations
const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
