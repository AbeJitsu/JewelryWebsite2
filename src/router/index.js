import Vue from "vue";
import VueRouter from "vue-router";
import JewelryShowcase from "../views/JewelryShowcase.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/jewelry-showcase", // Redirect from root to /jewelry-showcase
  },
  {
    path: "/jewelry-showcase",
    name: "jewelry-showcase",
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
    component: () => import("../views/ShopLive.vue"), // Lazy-loaded
  },

  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ContactUs.vue"), // Assuming you have a ConnectWithUs.vue
  },
  {
    path: "*",
    name: "not-found",
    component: () => import("../views/NotFound.vue"), // Assuming NotFound.vue is in the views folder
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
