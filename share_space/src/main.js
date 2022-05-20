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
Vue.filter("RMBformat", (val) => {
  return "￥" + Number(val);
});
Vue.filter("dateFormat", (Timestamp) => {
  let date1 = new Date(Timestamp);
  return (
    date1.toLocaleDateString().replace(/\//g, "-") +
    " " +
    date1.toTimeString().substr(0, 8)
  );
});

Date.prototype.MyFormat = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
// console.log(new Date().MyFormat("yyyy-MM-dd hh:mm:ss"));

Vue.prototype.$http = axios;
Vue.use(Vant);
Vue.use(Lazyload);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
