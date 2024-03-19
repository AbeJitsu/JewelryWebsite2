import Vue from "vue";
import VueRouter from "vue-router";
import JewelryShowcase from "../views/JewelryShowcase.vue";
import store from "@/store"; // Import Vuex store

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
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/watch-live",
    name: "watch-live",
    component: () => import("../views/ShopLive.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ContactUs.vue"),
  },
  {
    path: "*",
    name: "not-found",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminPage.vue"),
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: () => import("../views/ProductDetailView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/ViewCart.vue"),
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component: () => import("../views/CheckOut.vue"),
    meta: { requiresCart: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresCart)) {
    if (store.getters["cart/cartItems"].length === 0) {
      next({ name: "jewelry-showcase" }); // Redirect if cart is empty
    } else {
      next(); // Proceed if cart is not empty
    }
  } else {
    next(); // Proceed for routes that don't require cart check
  }
});

export default router;

// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/router/index.js
