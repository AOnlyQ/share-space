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
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/home",
    meta: { level: 2, activeNum: 0 },
    component: () => import("@/views/home/Home.vue"),
  },
  {
    path: "/category",
    meta: { level: 2, activeNum: 1 },
    component: () => import("@/views/Category.vue"),
  },
  {
    path: "/checkin",
    meta: { level: 2, activeNum: 2 },
    component: () => import("@/views/CheckIn.vue"),
  },
  {
    path: "/user",
    meta: { level: 2, activeNum: 3 },
    component: () => import("@/views/User.vue"),
  },
  {
    path: "/reserve",
    component: () => import("@/views/home/Reserve.vue"),
  },
  {
    // 套餐详情页面
    path: "/comboDetail",
    component: () => import("@/views/ComboDetail.vue"),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) next("/login");
  // console.log("tokenStr", tokenStr);
  next();
});
export default router;
