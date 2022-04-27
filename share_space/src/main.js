import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import { Lazyload } from "vant";

import "vant/lib/index.css";
import "@/assets/styles/reset.css";
import "@/assets/styles/border.css";
import "@/assets/styles/variables.styl";
import "@/assets/iconfont/iconfont.css";
import "@/request/request";
import axios from "axios";
var dayjs = require("dayjs");
//import dayjs from 'dayjs' // ES 2015
Vue.prototype.$dayjs = dayjs; //可以全局使用dayjs

// dayjs().format();
Vue.config.productionTip = false;

// 配置请求的根路径
axios.defaults.baseURL = "http://localhost:3001";

axios.interceptors.request.use((config) => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem("token");
  // 在最后必须 return config

  return config;
});

// 响应拦截器
axios.interceptors.response.use((config) => {
  return config;
});

Vue.prototype.$http = axios;
Vue.use(Vant);
Vue.use(Lazyload);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
