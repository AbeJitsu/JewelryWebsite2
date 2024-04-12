// main.js

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
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/custom.scss"; // This will override the above styles if there are conflicts

import App from "./App.vue";
import router from "./router";
import store from "./store";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// Adding both solid and brand icons to the library
library.add(
  faEye,
  faShoppingCart,
  faHeart,
  faFacebookF,
  faInstagram,
  faYoutube
);

// Registering components globally
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("TheHeader", TheHeader);
Vue.component("TheFooter", TheFooter);
Vue.component("VueSlickCarousel", VueSlickCarousel);

// Using plugins
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(PortalVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("user/tryAutoLogin");
  },
  render: (h) => h(App),
}).$mount("#app");
