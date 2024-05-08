//Users/abiezerreyes/Projects/JewelryWebsite2/client/src/main.js

// Vue and third-party imports
import Vue from "vue";
import axios from "axios";
import BootstrapVue, { IconsPlugin } from "bootstrap-vue";
import PortalVue from "portal-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faShoppingCart,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSlickCarousel from "vue-slick-carousel";

// Style imports
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/custom.scss"; // Custom overrides - currently not used

// Local imports
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

// Axios configuration
axios.defaults.baseURL = process.env.CLIENT_VUE_APP_API_URL;

// Font Awesome icons
library.add(
  faEye,
  faShoppingCart,
  faHeart,
  faFacebookF,
  faInstagram,
  faYoutube
);

// Global component registration
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("TheHeader", TheHeader);
Vue.component("TheFooter", TheFooter);
Vue.component("VueSlickCarousel", VueSlickCarousel);

// Vue plugin usage
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(PortalVue);

// Prevent the production tip on startup in a production environment
Vue.config.productionTip = false;

// Initialize Vue instance
new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("user/tryAutoLogin");
  },
  render: (h) => h(App),
}).$mount("#app");
