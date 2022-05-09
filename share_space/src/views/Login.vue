<template>
  <div class="login">
    <van-nav-bar title="逸间-登录" />
    <div class="loginForm">
      <div class="welcome">欢迎回来~</div>

      <van-form @submit="login">
        <van-field
          v-model="loginForm.username"
          name="用户名"
          placeholder="请输入帐号"
        />
        <van-field
          v-model="loginForm.password"
          :type="passwordType"
          name="密码"
          placeholder="请输入密码"
        >
          <template slot="right-icon">
            <span class="solts" @click="switchPasswordType">
              <van-icon name="eye" v-if="passwordType === 'password'" />
              <van-icon name="closed-eye" v-else />
            </span>
          </template>
        </van-field>
        <div class="loginBtn">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            style="background: #1ab7a0"
          >
            登录
          </van-button>
        </div>
      </van-form>
      <router-link to="/register" class="test">注册账号</router-link>
    </div>
  </div>
</template>
<script>
import { Login } from "@/request/api";

export default {
  name: "Login",
  data() {
    return {
      logoImg: require("@/assets/yijian-logo.png"),
      passwordType: "password",
      loginForm: {
        username: "test",
        password: "123456",
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
      Login(this.loginForm)
        .then((res) => {
          // console.log("Login组件中login", res);
          window.sessionStorage.setItem("token", res.data.token);
          // let userInfo = { username: res.data.username };

          // 方法1.保存在sessionStorage中每次取当前用户id有点麻烦
          window.sessionStorage.setItem(
            "userInfo",
            JSON.stringify(res.data.userInfo)
          );
          // 将store中的数据更新
          this.$store.commit("setUserInfo", res.data.userInfo);
          // 方法2.只将其存储在vuex中,不可行，页面刷新，vuex数据恢复默认值，
          // this.$store.commit('setUserInfo', res.data.userInfo);
          this.$router.push("/home");
        })
        .catch(() => {
          this.$toast.fail({ message: "用户名或密码错误！", duration: 2000 });
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.login {
  background: #fff;
  height: 8.12rem;
}

.van-nav-bar__title {
  font-size: 0.17rem;
}

.loginForm {
  margin: 0.24rem;

  .welcome {
    font-size: 28px;
  }

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
    margin: 0.7rem 0 0.2rem 0;
  }
}

.van-cell.van-field {
  background: #F3F3F3;
  border-radius: 0.3rem;
  margin: 0.2rem 0;
}

.test {
  float: right;
}
</style>
