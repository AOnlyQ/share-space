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
Vue.config.productionTip = false;
Vue.use(Vant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
