// store/modules/product.js
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
      state.selectedProduct = state.products.find((p) => p.id === productId);
    },
  },
  actions: {
    fetchProducts({}) {
      // API call to fetch products and commit SET_PRODUCTS mutation
    },
    selectProduct({}, productId) {
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
