// store/modules/product.js
import axios from "axios";

export default {
  state: {
    products: [],
    selectedProduct: null,
    error: null, // New state property for error handling
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
      state.error = null; // Reset error state on successful fetch
    },
    SET_SELECTED_PRODUCT(state, productId) {
      state.selectedProduct = state.products.find((p) => p._id === productId);
    },
    SET_ERROR(state, error) {
      // New mutation for setting error state
      state.error = error;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get("/api/products");
        commit("SET_PRODUCTS", response.data);
      } catch (error) {
        console.error("There was an error fetching the products:", error);
        commit("SET_ERROR", "Failed to fetch products"); // Committing error state
      }
    },
    selectProduct({ commit, state }, productId) {
      if (!state.products.length) {
        // Optional: Fetch products if not already loaded
        this.dispatch("product/fetchProducts").then(() => {
          commit("SET_SELECTED_PRODUCT", productId);
        });
      } else {
        commit("SET_SELECTED_PRODUCT", productId);
      }
    },
  },
  getters: {
    allProducts: (state) => state.products,
    selectedProduct: (state) => state.selectedProduct,
    isError: (state) => !!state.error, // New getter to check if there's an error
  },
};
