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
      // Find and set the selected product based on productId
      state.selectedProduct = state.products.find((p) => p.id === productId);
    },
  },
  actions: {
    fetchProducts({ commit }) {
      // Mock API call to fetch products
      axios
        .get("path/to/your/products/api")
        .then((response) => {
          // Use commit to call SET_PRODUCTS mutation with the response data
          commit("SET_PRODUCTS", response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the products:", error);
        });
    },
    selectProduct({ commit }, productId) {
      // Use commit to call SET_SELECTED_PRODUCT mutation with the productId
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
