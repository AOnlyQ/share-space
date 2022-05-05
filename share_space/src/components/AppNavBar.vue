<template>
  <van-sticky>
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
  </van-sticky>
</template>
<script>
export default {
  props: ["title"],
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="stylus" scoped>
.van-nav-bar {
  background: $bgColor;

  /deep/ .van-nav-bar__title, /deep/ .van-icon {
    color: #fff;
  }
}
</style>
