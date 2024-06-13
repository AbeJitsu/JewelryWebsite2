// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/router/index.js

import Vue from "vue";
import Router from "vue-router";
import CheckOut from "@/views/checkout/CheckOut.vue";
import ShippingInformation from "@/views/checkout/ShippingInformation.vue";
import BillingInformation from "@/views/checkout/BillingInformation.vue";
import PaymentDetails from "@/views/checkout/PaymentDetails.vue";
import JewelryShowcase from "../views/JewelryShowcase.vue";
import store from "@/store";

Vue.use(Router);

const routes = [
  { path: "", redirect: "/jewelry-showcase" },
  { path: "/", redirect: "/jewelry-showcase" },
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
    component: CheckOut,
    meta: { requiresCart: true, requiresAuth: true },
    children: [
      {
        path: "shipping",
        name: "checkout-shipping",
        component: ShippingInformation,
      },
      {
        path: "billing",
        name: "checkout-billing",
        component: BillingInformation,
        meta: { requiresShipping: true },
      },
      {
        path: "payment",
        name: "checkout-payment",
        component: PaymentDetails,
        meta: { requiresBilling: true },
      },
    ],
  },
];

const router = new Router({
  mode: "history",
  base: process.env.VUE_APP_CLIENT_BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.getters["user/isLoggedIn"];
  const isAdmin = store.getters["user/isAdmin"];
  const hasItemsInCart = store.getters["cart/cartItems"].length > 0;
  const shippingCompleted = store.getters["checkout/shippingCompleted"];
  const billingCompleted = store.getters["checkout/billingCompleted"];

  if (!isLoggedIn) {
    console.log("Router: Dispatching tryAutoLogin");
    await store.dispatch("user/tryAutoLogin");
  }

  if (to.matched.some((record) => record.meta.requiresAuth && !isLoggedIn)) {
    store.commit("cart/SET_POST_LOGIN_REDIRECT", to.fullPath);
    store.dispatch("triggerAuthModal");
    next(false);
  } else if (
    to.matched.some((record) => record.meta.requiresCart && !hasItemsInCart)
  ) {
    next({ name: "jewelry-showcase" });
  } else if (
    to.matched.some(
      (record) => record.meta.requiresShipping && !shippingCompleted
    )
  ) {
    next({ name: "checkout-shipping" });
  } else if (
    to.matched.some(
      (record) => record.meta.requiresBilling && !billingCompleted
    )
  ) {
    next({ name: "checkout-billing" });
  } else if (
    to.matched.some((record) => record.meta.role === "admin" && !isAdmin)
  ) {
    next({ name: "not-found" });
  } else {
    next();
  }
});

export default router;
