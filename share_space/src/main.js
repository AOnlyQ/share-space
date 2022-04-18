import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import "@/assets/styles/reset.css";
import "@/assets/styles/border.css";
import "@/assets/iconfont/iconfont.css";
import "@/request/request";
import axios from "axios";
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
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
