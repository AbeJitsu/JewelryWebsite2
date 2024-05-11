// /Users/abiezerreyes/Documents/JewelryWebsite2/client/src/store/modules/product.js

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

    SET_PRODUCT_DETAILS(state, productDetails) {
      console.log("Setting product details:", productDetails);
      const existingProductIndex = state.products.findIndex(
        (product) => product._id === productDetails._id
      );
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex] = productDetails;
      } else {
        state.products.push(productDetails);
      }
    },
    SET_ERROR(state, error) {
      console.error("Setting error in Vuex:", error);
      state.error = error;
    },
  },
  actions: {
    async fetchProducts({ commit }, { offset = 0, limit = 12 } = {}) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/products?offset=${offset}&limit=${limit}`
        );
        commit("SET_PRODUCTS", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        commit("SET_ERROR", "Failed to fetch products");
      }
    },
    async setSelectedProduct({ commit }, productId) {
      try {
        // Fetch product details using the productId
        const response = await axios.get(`/api/products/${productId}`);
        // Commit the product data to the store
        commit("SET_SELECTED_PRODUCT", response.data);
      } catch (error) {
        // Handle errors gracefully
        console.error("Error fetching product:", error);
      }
    },

    async fetchProductById({ commit, state }, productId) {
      console.log("Fetching product by ID:", productId);
      if (state.products.some((product) => product._id === productId)) {
        console.log("Product already in state:", productId);
        return;
      }

      try {
        const response = await axios.get(`/api/products/${productId}`);
        console.log("API response for product:", response.data);
        if (response.data) {
          commit("SET_PRODUCT_DETAILS", response.data);
        } else {
          console.error("No data returned for product:", productId);
          commit("SET_ERROR", `No data returned for product: ${productId}`);
        }
      } catch (error) {
        console.error("Error fetching product details:", productId, error);
        commit(
          "SET_ERROR",
          `Failed to fetch product details: ${error.message}`
        );
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
      state.products.filter(
        (product) => filter === "all" || product.type === filter
      ),
  },
};
