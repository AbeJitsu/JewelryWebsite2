import Vue from "vue";
import VueRouter from "vue-router";
import JewelryShowcase from "../views/JewelryShowcase.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: JewelryShowcase,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"), // Lazy-loaded
  },
  {
    path: "/live-shows",
    name: "live-shows",
    component: () => import("../views/FacebookLive.vue"), // Lazy-loaded
  },

  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ConnectWithUs.vue"), // Assuming you have a ContactView.vue
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
