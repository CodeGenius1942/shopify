import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterUser.vue"),
      meta: { requiresUnauth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginUser.vue"),
      meta: { requiresUnauth: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          name: "profile",
          path: "/profile",
          component: () => import("../views/dashboard/Profile.vue"),
        },
      ],
    },
  ],
});

const isAuthenticated = store.getters["auth/isAuthenticated"];

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
