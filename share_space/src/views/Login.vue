<template>
  <div class="loginForm">
    <div class="logo">
      <img :src="logoImg" alt="无" />
    </div>

    <van-form @submit="login">
      <van-field
        v-model="loginForm.username"
        type="number"
        label="账号"
        name="用户名"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        label="密码"
        name="密码"
        placeholder="请输入密码"
      />
      <div style="margin: 16px" class="loginBtn">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          style="background: #1ab7a0"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      logoImg: require("@/assets/yijian-logo.png"),
      loginForm: {
        username: "admin",
        password: "admin",
      },
    };
  },
  created() {
    const res = axios.post("http://127.0.0.1:3001/users/login", this.loginForm);
    console.log("res", res);
  },
  mounted() {
    // this.$refs.checkbox.submit();
  },
  methods: {
    async login() {
      console.log("zhixinglogin");
      const res = await this.$axios.post("/users/login", this.loginForm);
      console.log(res);
    },
  },
};
</script>
<style lang="stylus">
.loginForm {
  margin: 0.24rem;

  .logo {
    height: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;

    img {
      // width: 100%;
      height: 100%;
    }
  }

  .loginBtn {
    margin-top: 0.7rem !important;
  }
}

.van-cell.van-field {
  border-bottom: 0.01rem solid #8d8d8d;
}
</style>
