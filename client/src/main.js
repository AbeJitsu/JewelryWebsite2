import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import { IconsPlugin } from "bootstrap-vue";
import PortalVue from "portal-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
library.add(faFacebookF, faInstagram, faYoutube);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// Update these paths to reflect the new location
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

library.add(faFacebookF, faYoutube, faInstagram);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("TheHeader", TheHeader);
Vue.component("TheFooter", TheFooter);

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
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
