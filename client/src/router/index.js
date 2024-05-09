// /Users/abiezerreyes/Documents/JewelryWebsite2/client/src/router/index.js

import Vue from "vue";
import VueRouter from "vue-router";
import JewelryShowcase from "../views/JewelryShowcase.vue";
import store from "@/store";

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
    component: () => import("../views/checkout/ViewCart.vue"),
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component: () => import("../views/checkout/CheckOut.vue"),
    meta: { requiresCart: true, requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_CLIENT_BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters["user/isLoggedIn"];
  const hasItemsInCart = store.getters["cart/cartItems"].length > 0;

  // Authentication and Cart Checks
  if (to.matched.some((record) => record.meta.requiresAuth && !isLoggedIn)) {
    store.commit("cart/SET_POST_LOGIN_REDIRECT", to.fullPath);
    store.dispatch("triggerAuthModal");
    next(false); // halt navigation
  } else if (
    to.matched.some((record) => record.meta.requiresCart && !hasItemsInCart)
  ) {
    next({ name: "jewelry-showcase" });
  } else {
    next(); // proceed
  }
});

export default router;
