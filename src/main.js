import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import PortalVue from "portal-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Make PortalVue available throughout your project for passing components to different parts of the DOM
Vue.use(PortalVue);

// Prevent Vue from displaying the production tip message in the console
Vue.config.productionTip = false;

// Create and mount the root Vue instance
new Vue({
  router, // Use the router
  store, // Use the Vuex store
  render: (h) => h(App), // Render the App component as the root of your app
}).$mount("#app");
