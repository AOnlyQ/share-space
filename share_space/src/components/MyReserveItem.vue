<template>
  <div class="container">
    <div class="left" style="flex: 8">
      <div class="left-item">
        <van-icon name="location-o" color="#F4D04B" size=".16rem" />
        <span class="title"
          >场馆：
          <span> {{ reservationInfo.roomName }}</span>
        </span>
      </div>
      <div class="left-item">
        <van-icon name="sign" color="#F4D04B" size=".16rem" />
        <span class="title"
          >时间：
          <span>
            {{
              reservationInfo.start_time +
              " 至 " +
              reservationInfo.end_time.slice(5)
            }}
          </span>
        </span>
      </div>
      <div class="left-item">
        <van-icon name="underway-o" color="#F4D04B" size=".16rem" />
        <span class="title"
          >座位：
          <span>{{ reservationInfo.seatName }}</span>
        </span>
      </div>
    </div>
    <div class="right" style="flex: 2">
      <!-- 暂时还没有实现取消预约的功能 -->
      <!-- <van-button type="primary" size="mini" color="#F4D04B">
        取消预约
      </van-button> -->
    </div>
    <!-- <div class="title">{{}}</div>
    <div>{{comboInfo[0]}}</div>
    <div class="footer">
      <div>到馆签到后开通使用</div>
     
    </div> -->
  </div>
</template>
<script>
export default {
  props: ["reservationInfo"],
  created() {
    console.log("reservationInfo", this.reservationInfo);
  },
};
</script>
<style lang="stylus" scoped>
.container {
  background: #fff;
  padding: 0.1rem 0.2rem;
  border-bottom: 0.01rem solid #ccc;
  display: flex;
  font-size: 0.13rem;

  .left {
    .left-item {
      .van-icon {
        margin-right: 0.1rem;
      }
    }

    .title {
      span {
        color: #7c7c7c;
      }
    }
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .van-button {
      color: #000 !important;
      border-color: #ddd !important;
    }
  }
}
</style>
