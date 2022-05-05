<template>
  <div style="">
    <van-sticky>
      <van-nav-bar title="联系我们" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="main">
      <p>亲爱的会员添加微信或拨打客服电话，为你答疑哦！</p>
      <p>咨询电话：15660260444</p>
      <img src="http://175.178.87.164:8888/down/WnEE0bktlXa9" alt="" />
      <h3>微信号：15660260444</h3>
    </div>
  </div>
</template>
<script>
export default {
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

.main {
  box-sizing: border-box;
  height: 7.66rem;
  background-color: #fff;
  padding: 0.3rem 0.2rem;
  font-size: 0.16rem;

  h3 {
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
  }

  p {
    margin: 0.2rem 0;
  }

  img {
    width: 50%;
    border-radius: 50%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
