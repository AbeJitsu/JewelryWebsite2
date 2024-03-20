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
});

// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/index.js
