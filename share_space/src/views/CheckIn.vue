<template>
  <div>
    <van-sticky>
      <van-nav-bar title="签到" />
    </van-sticky>
    <div class="container">
      <div class="img">
        <!-- 请先选择结算套餐，再签到 -->
      </div>
      <!-- <IconTextBtn
        text="更换座位"
        iconName="passed"
        style="margin: 0.15rem 0"
      /> -->
      <div style="display: flex">
        <!-- <IconTextBtn
          text="选择套餐"
          style="flex: 1; margin-right: 0.1rem"
          iconName="passed"
        /> -->
        <IconTextBtn
          text="点击签到"
          style="flex: 1"
          iconName="location-o"
          name="checkin"
        />
      </div>
      <div class="info">
        <van-icon name="volume" color="#F4D04B" size=".2rem" />
        温馨提示<br />
        请合理安排学习时间及时长，并以此为依据合理选择结算套餐，签退时请确认本次学习所使用的结算套餐是否合适，如不合适请修改结算套餐，再签退扣除套餐避免造成不必要的损失!
      </div>
    </div>
  </div>
</template>
<script>
import IconTextBtn from "@/components/IconTextBtn";
export default {
  components: { IconTextBtn },
  data() {
    return {
      url: "",
    };
  },
};
</script>
<style lang="stylus" scoped>
.container {
  padding: 0.12rem;
  height: 7rem;

  .img {
    height: 0.6rem;
    height: 3rem;
    border-radius: 0.2rem;
    overflow: hidden;
    background: url('../assets/bg1.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 0.1rem;
  }

  .info {
    line-height: 0.17rem;
    height: 0.17rem;
    padding: 0.4rem 0.2rem;
  }
}
</style>
