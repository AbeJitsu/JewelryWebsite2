// store/modules/product.js
import axios from "axios";

export default {
  state: {
    products: [],
    selectedProduct: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_SELECTED_PRODUCT(state, productId) {
      // Adjusted to use '_id' matching backend MongoDB convention
      state.selectedProduct = state.products.find((p) => p._id === productId);
    },
  },
  actions: {
    fetchProducts({ commit }) {
      // Updated to use the actual endpoint provided by the backend
      axios
        .get("/api/products") // Ensure this matches your actual API endpoint
        .then((response) => {
          commit("SET_PRODUCTS", response.data); // Assumes response.data is the array of products
        })
        .catch((error) => {
          console.error("There was an error fetching the products:", error);
        });
    },
    selectProduct({ commit }, productId) {
      // No change needed here, but ensuring 'productId' matches the '_id' used in your backend
      commit("SET_SELECTED_PRODUCT", productId);
    },
  },
  getters: {
    allProducts(state) {
      return state.products;
    },
    selectedProduct(state) {
      return state.selectedProduct;
    },
  },
};
