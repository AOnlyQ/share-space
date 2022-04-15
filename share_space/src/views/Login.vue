<template>
  <div class="loginForm">
    <div class="logo">
      <img :src="logoImg" alt="无" />
    </div>

    <van-form @submit="login">
      <van-field v-model="number" type="number" label="数字" />
      <!-- 输入密码 -->
      <van-field v-model="password" type="password" label="密码" />
      <div style="margin: 16px">
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
export default {
  name: "Login",
  data() {
    return {
      logoImg: require("@/assets/yijian-logo.png"),
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  mounted: {
    // this.$refs.checkbox.submit();
  },
  methods: {
    async login() {
      const res = await this.$axios.post("login", this.loginForm);
      console.log(res);
    },
  },
};
</script>
<style lang="stylus">
.loginForm {
  padding: 0.2rem;

  .logo {
    height: 0.3rem;

    img {
      // width: 100%;
      height: 100%;
    }
  }
}
</style>
