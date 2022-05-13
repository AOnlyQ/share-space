<template>
  <div style="height: 8.12rem; background: #fff">
    <van-sticky>
      <van-nav-bar title="逸间自习室" />
    </van-sticky>
    <div class="registerForm">
      <div class="logo">
        <img :src="logoImg" alt="无" />
      </div>
      <van-form @submit="registeer">
        <van-field
          v-model="registerForm.username"
          label="用户名"
          name="pattern"
          placeholder="请输入用户名"
          :rules="[{ pattern, message: '请填写3-10位字符' }]"
        />
        <van-field
          v-model="registerForm.password"
          :type="passwordType"
          label="密码"
          name="validator"
          placeholder="请输入密码"
          :rules="[
            {
              validator,
              message: '请填写6-15位字符串,需包含大小写字母数字特殊符号',
            },
          ]"
        >
          <template slot="right-icon">
            <span class="solts" @click="switchPasswordType">
              <van-icon name="eye" v-if="passwordType === 'password'" />
              <van-icon name="closed-eye" v-else />
            </span>
          </template>
        </van-field>
        <van-field
          v-model="confirmPassword"
          :type="conPasswordType"
          label="确认密码"
          placeholder="请输入确认密码"
          :rules="[{ required: true, message: '请填写6-15位字符' }]"
        >
          <template slot="right-icon">
            <span class="solts" @click="switchPasswordType('confirm')">
              <van-icon name="eye" v-if="conPasswordType === 'password'" />
              <van-icon name="closed-eye" v-else />
            </span>
          </template>
        </van-field>
        <div style="margin: 16px" class="registerBtn">
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
      // 用户名正则校验3-10位字符，中文、字母、数字、下划线、减号
      pattern: /^[\u4E00-\u9FA5A-Za-z0-9_-]{3,10}$/,
      logoImg: require("@/assets/yijian-logo.png"),
      passwordType: "password",
      conPasswordType: "password",

      registerForm: {
        username: "",
        password: "",
      },
      confirmPassword: "",
    };
  },

  methods: {
    // 函数校验密码
    validator(val) {
      // 密码正则为6-15位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
      return /^.*(?=.{6,15})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
        val
      );
    },
    switchPasswordType(type) {
      if (type === "confirm") {
        this.conPasswordType =
          this.conPasswordType === "password" ? "text" : "password";
      } else {
        this.passwordType =
          this.passwordType === "password" ? "text" : "password";
      }
    },

    async registeer() {
      // if()
      // 注册前判断用户输入的两次密码是否相等
      if (this.registerForm.password !== this.confirmPassword) {
        this.$toast.fail("两次输入的密码不一致！");
      } else {
        Register(this.registerForm)
          .then(() => {
            this.$toast.success("注册成功");
          })
          .catch(() => {
            this.$toast.fail({ message: "用户名已经存在！", duration: 1000 });
          });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.registerForm {
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

  .registerBtn {
    margin-top: 0.7rem !important;
  }
}

.van-cell.van-field {
  background: #f3f3f3;
  margin: 0.1rem 0;
}
</style>
