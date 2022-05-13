<template>
  <div style="height: 8.12rem; background: #fff">
    <AppNavBar title="系统设置" />
    <div class="container">
      <van-cell title="基本资料" is-link @click="$router.push('/user_info')" />
      <van-cell
        title="修改密码"
        is-link
        @click="$router.push('/pwd_setting')"
      />
      <!-- icon="description" -->
      <van-cell
        title="用户协议"
        is-link
        @click="$router.push('/register_info')"
      />
      <!-- icon="goods-collect-o" -->
      <van-cell
        title="隐私政策"
        is-link
        @click="$router.push('/private_policy')"
      />

      <div class="logout-btn" @click="logout">退出登录</div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.container {
  background: #fff;

  .logout-btn {
    position: fixed;
    bottom: 0;
    height: 0.46rem;
    line-height: 0.46rem;
    text-align: center;
    background: #fff;
    width: 100%;
    color: $bgColor;
    font-size: 0.17rem;
    border-top: 1px solid #F4F4F4;
  }

  .van-cell {
    border-bottom: 1px solid #F4F4F4;
  }
}
</style>
<script>
import AppNavBar from "@/components/AppNavBar";
export default {
  components: { AppNavBar },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
