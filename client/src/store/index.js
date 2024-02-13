import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// Modular imports
import productModule from "./modules/product";
import userModule from "./modules/user";
import cartModule from "./modules/cart";
import modalModule from "./modules/modal";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // Retain the global jewelryData state for shared access
    jewelryData: [],
  },
  mutations: {
    // Global mutation for setting products
    SET_PRODUCTS(state, products) {
      state.jewelryData = products;
    },
  },
  actions: {
    // Global action for fetching products
    fetchProducts({ commit }) {
      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/api/products`)
        .then((response) => commit("SET_PRODUCTS", response.data))
        .catch((error) =>
          console.error("There was an error fetching the products:", error)
        );
    },
  },
  getters: {
    // Global getter for accessing all jewelry items
    jewelryItems(state) {
      return state.jewelryData;
    },
  },
  modules: {
    // Integrate modules for handling specific domains
    product: productModule,
    user: userModule,
    cart: cartModule,
    modal: modalModule,
  },
});

export default store;

// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/index.js
