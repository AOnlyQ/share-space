import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 当前登录的用户的一些信息
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
    },
  },
  actions: {},
  modules: {},
});
