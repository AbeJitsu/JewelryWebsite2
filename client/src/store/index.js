import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jewelryData: [],
  },
  mutations: {
    setJewelryData(state, data) {
      state.jewelryData = data;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/api/products`)
        .then((response) => commit("SET_PRODUCTS", response.data))
        .catch((error) =>
          console.error("There was an error fetching the products:", error)
        );
    },
  },
  modules: {},
});

// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/index.js
