<template>
  <div style="height: 8.12rem; background: #fff">
    <van-sticky>
      <van-nav-bar title="逸间自习室" />
    </van-sticky>
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
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          :type="passwordType"
          label="密码"
          name="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template slot="right-icon">
            <span class="solts" @click="switchPasswordType">
              <van-icon name="eye" v-if="passwordType === 'password'" />
              <van-icon name="closed-eye" v-else />
            </span>
          </template>
        </van-field>

        <div style="margin: 16px" class="loginBtn">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            style="background: #1ab7a0"
          >
            注册
          </van-button>
        </div>
      </van-form>
      <router-link to="/login" class="float-right">登录账号</router-link>
    </div>
  </div>
</template>
<script>
import { Register } from "@/request/api";
export default {
  name: "Register",
  data() {
    return {
      logoImg: require("@/assets/yijian-logo.png"),
      passwordType: "password",
      loginForm: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    switchPasswordType() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
    async login() {
      // if()
      Register(this.loginForm)
        .then(() => {
          this.$toast.success("注册成功");
        })
        .catch(() => {
          this.$toast.fail({ message: "用户名已经存在！", duration: 1000 });
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.loginForm {
  margin: 0 0.24rem;
  height: 100%;

  .logo {
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      // width: 100%;
      height: 0.4rem;
      border-radius: 25%;
      overflow: hidden;
    }
  }

  .loginBtn {
    margin-top: 0.7rem !important;
  }
}

.van-cell.van-field {
  background: #f3f3f3;
  margin: 0.1rem 0;
}
</style>
