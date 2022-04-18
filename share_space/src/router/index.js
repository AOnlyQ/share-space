import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
