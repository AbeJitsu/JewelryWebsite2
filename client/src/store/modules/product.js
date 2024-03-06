//Users/abiezerreyes/Projects/JewelryWebsite2/client/src/store/modules/product.js
import axios from "axios";

export default {
  namespaced: true,
  state: {
    products: [],
    selectedProduct: null,
    error: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = [
        ...state.products,
        ...products.map((product) => ({
          ...product,
          type: product.type || "everyday",
        })),
      ];
    },
    SET_SELECTED_PRODUCT(state, product) {
      state.selectedProduct = product;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchProducts({ commit }, { offset = 0, limit = 12 }) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/products?offset=${offset}&limit=${limit}`
        );
        commit("SET_PRODUCTS", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        commit("SET_ERROR", "Failed to fetch products");
      }
    },
    async setSelectedProduct({ commit, state }, productId) {
      let product = state.products.find((p) => p._id === productId);
      if (!product) {
        // Product not found in state, attempt to fetch from backend
        try {
          const response = await axios.get(`/api/products/${productId}`);
          product = response.data;
          commit("SET_SELECTED_PRODUCT", product);
        } catch (error) {
          console.error("Error fetching product:", productId, error);
          commit("SET_ERROR", `Product fetch failed: ${productId}`);
        }
      } else {
        commit("SET_SELECTED_PRODUCT", product);
      }
    },
  },
  getters: {
    allProducts: (state) => state.products,
    selectedProduct: (state) => state.selectedProduct,
    isError: (state) => !!state.error,
    getProductById: (state) => (productId) =>
      state.products.find((product) => product._id === productId),
    filteredProducts: (state) => (filter) =>
      filter === "all"
        ? state.products
        : state.products.filter((product) => product.type === filter),
  },
};
