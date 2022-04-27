<template>
  <van-tabbar v-model="active" active-color="#F4D04B" inactive-color="#666">
    <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="shopping-cart">
      选购套餐
    </van-tabbar-item>
    <van-tabbar-item to="/checkin" icon="todo-list">签到选座</van-tabbar-item>
    <van-tabbar-item to="/user" icon="manager">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    active: {
      get() {
        return this.$route.meta.activeNum;
      },
      set() {},
    },
  },
};
</script>
<style lang="stylus" scoped>
.van-tabbar {
}
</style>
