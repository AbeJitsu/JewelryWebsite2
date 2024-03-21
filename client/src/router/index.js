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
    component: () => import("../views/checkout/CheckOut.vue"),
    meta: { requiresCart: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Check for routes that require the user's cart to not be empty
  if (to.matched.some((record) => record.meta.requiresCart)) {
    if (store.getters["cart/cartItems"].length === 0) {
      next({ name: "jewelry-showcase" }); // Redirect if cart is empty
    } else {
      next(); // Proceed if cart is not empty
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check for routes that require authentication
    if (!store.getters["user/isLoggedIn"]) {
      next({ name: "login" }); // Redirect to login if not authenticated
    } else if (
      to.meta.role &&
      store.getters["user/userRole"] !== to.meta.role
    ) {
      // If a specific role is required, check the user's role
      next({ name: "not-found" }); // Redirect to a 'not found' or 'unauthorized' page if the user does not have the right role
    } else {
      next(); // Proceed if authenticated and correct role
    }
  } else {
    next(); // Proceed for routes that don't require authentication or cart check
  }
});

export default router;

// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/router/index.js
