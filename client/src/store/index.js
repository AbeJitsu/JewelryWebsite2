import Vue from "vue";
import Vuex from "vuex";

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
  actions: {},
  modules: {},
});
