import Vue from "vue";
import VueRouter from "vue-router";
import JewelryShowcase from "../views/JewelryShowcase.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/jewelry-showcase",
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
    path: "/watch-live",
    name: "watch-live",
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
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminPage.vue"), // You need to create this view
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/product/:id", // Dynamic segment for product ID
    name: "product-detail",
    component: () => import("../views/ProductDetailView.vue"), // Assuming you create this component
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
