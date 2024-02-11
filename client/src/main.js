// main.js

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import { IconsPlugin } from "bootstrap-vue";
import PortalVue from "portal-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
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
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

library.add(faFacebookF, faInstagram, faYoutube);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("TheHeader", TheHeader);
Vue.component("TheFooter", TheFooter);
Vue.component("VueSlickCarousel", VueSlickCarousel);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(PortalVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");