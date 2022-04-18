<template>
  <div class="loginForm">
    <div class="logo">
      <img :src="logoImg" alt="无" />
    </div>

    <van-form @submit="login">
      <van-field
        v-model="loginForm.username"
        label="账号"
        name="用户名"
        placeholder="请输入帐号"
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
// import axios from "axios";
// import { Login } from "@/request/api";
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

  methods: {
    async login() {
      const res = await this.$http.post("/users/login", this.loginForm);
      if (res.status === 200) {
        this.$router.push("/home");
      }
      console.log("res", res);
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
