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
    component: () => import("@/views/user/User.vue"),
  },
  {
    path: "/my_combos",
    component: () => import("@/views/user/MyCombos.vue"),
  },
  {
    path: "/my_reserve",
    component: () => import("@/views/user/MyReserve.vue"),
  },
  {
    // 我的订单页面
    path: "/order",
    component: () => import("@/views/user/Order.vue"),
  },
  {
    path: "/learning_rules",
    component: () => import("@/views/user/LearningRules.vue"),
  },
  {
    path: "/register_info",
    component: () => import("@/views/user/RegisterInfo.vue"),
  },
  {
    path: "/private_policy",
    component: () => import("@/views/user/PrivatePolicy.vue"),
  },
  {
    path: "/contact_us",
    component: () => import("@/views/user/ContactUs.vue"),
  },
  {
    path: "/reserve",
    component: () => import("@/views/home/Reserve.vue"),
  },

  {
    // 套餐详情页面,有购买套餐功能
    path: "/comboDetail",
    component: () => import("@/views/ComboDetail.vue"),
  },
  {
    // 套餐详情页面,仅仅展示数据
    path: "/comboDetailInfo",
    component: () => import("@/views/ComboDetailInfo.vue"),
  },
  {
    path: "/test",
    component: () => import("@/views/Test.vue"),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/register") return next();
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) next("/login");
  // console.log("tokenStr", tokenStr);
  next();
});
export default router;
