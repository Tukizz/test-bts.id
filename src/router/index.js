import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/index.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/login.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/register.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/admin",
    name: "adminHome",
    component: () => import("@/views/admin/index.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLogin) {
      next();
      return;
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }

  if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.isLogin) {
      next({ name: "home" });
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
