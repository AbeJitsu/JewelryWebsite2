import Vue from "vue";
import Vuex from "vuex";

// Import Vuex modules
import productModule from "./modules/product";
import userModule from "./modules/user";
import cartModule from "./modules/cart";
import modalModule from "./modules/modal";

Vue.use(Vuex);

export default new Vuex.Store({
  // Registering modules with namespaced: true
  modules: {
    product: {
      ...productModule,
      namespaced: true,
    },
    user: {
      ...userModule,
      namespaced: true,
    },
    cart: {
      ...cartModule,
      namespaced: true,
    },
    modal: {
      ...modalModule,
      namespaced: true,
    },
  },
  // Optional: Define global state, mutations, actions, getters here
  state: {
    // Your global state
  },
  mutations: {
    // Your global mutations
  },
  actions: {
    // Your global actions
  },
  getters: {
    // Your global getters
  },
});

// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/index.js
