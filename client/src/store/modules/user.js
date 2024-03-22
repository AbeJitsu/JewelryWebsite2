import axios from "axios";

export default {
  namespaced: true,

  state: {
    status: "",
    user: null,
    shippingInfo: null,
    billingInfo: null,
    paymentInfo: null,
  },

  getters: {
    isLoggedIn: (state) => !!state.user,
    authStatus: (state) => state.status,
    user: (state) => state.user,
    isAdmin: (state) => state.user && state.user.role === "admin",
    shippingInfo: (state) => state.shippingInfo,
    billingInfo: (state) => state.billingInfo,
    paymentInfo: (state) => state.paymentInfo,
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

    // New actions for updating shipping, billing, and payment info
    async updateShippingInfo({ commit }, shippingInfo) {
      commit("setShippingInfo", shippingInfo);
      // Update the backend with the new shipping info
      // Replace '/api/user/updateShippingInfo' with your actual API endpoint
      await axios.post("/api/user/updateShippingInfo", shippingInfo, {
        withCredentials: true,
      });
    },

    async updateBillingInfo({ commit }, billingInfo) {
      commit("setBillingInfo", billingInfo);
      // Update the backend with the new billing info
      // Replace '/api/user/updateBillingInfo' with your actual API endpoint
      await axios.post("/api/user/updateBillingInfo", billingInfo, {
        withCredentials: true,
      });
    },

    async updatePaymentInfo({ commit }, paymentInfo) {
      commit("setPaymentInfo", paymentInfo);
      // Update the backend with the new payment info
      // Replace '/api/user/updatePaymentInfo' with your actual API endpoint
      await axios.post("/api/user/updatePaymentInfo", paymentInfo, {
        withCredentials: true,
      });
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
    // New mutations for shipping, billing, and payment info
    setShippingInfo(state, info) {
      state.shippingInfo = info;
    },
    setBillingInfo(state, info) {
      state.billingInfo = info;
    },
    setPaymentInfo(state, info) {
      state.paymentInfo = info;
    },
  },
};
