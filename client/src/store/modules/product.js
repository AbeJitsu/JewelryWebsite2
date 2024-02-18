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
      // Renaming "everyday" to "everyday" for $5 jewelry
      state.products = products.map((product) => ({
        ...product,
        type: product.type || "everyday", // More descriptive default type
      }));
    },
    SET_SELECTED_PRODUCT(state, product) {
      state.selectedProduct = product;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/products`
        );
        commit("SET_PRODUCTS", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        commit("SET_ERROR", "Failed to fetch products");
      }
    },
    setSelectedProduct({ commit, state }, productId) {
      const product = state.products.find((p) => p._id === productId);
      if (product) {
        commit("SET_SELECTED_PRODUCT", product);
      } else {
        console.error("Product not found:", productId);
        commit("SET_ERROR", `Product not found: ${productId}`); // Improved error handling
        // Optionally, you could clear the selectedProduct or handle this error differently.
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
