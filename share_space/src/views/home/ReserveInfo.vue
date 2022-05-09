<template>
  <div>
    <AppNavBar title="预约成功" />
    <div class="container">
      <div class="header">
        <van-icon name="checked" color="#F4D04B" size="1rem" />
        <div class="location">逸间自习室</div>
        <div class="title">亲爱的会员</div>
        <div class="title">恭喜你！预约成功！</div>
      </div>
      <div class="space"></div>
      <div class="footer">
        <div class="info">预约自习室：{{ reservationInfo.roomName }}</div>
        <div class="info">预约座位：{{ reservationInfo.seatName }}</div>
        <div class="info">预约时间： {{ reservationTime }}</div>
        <div class="info-footer">请及时到馆签到！</div>
      </div>
    </div>
  </div>
</template>
<script>
import AppNavBar from "@/components/AppNavBar.vue";
import { GetReservationById } from "@/request/api";
export default {
  components: { AppNavBar },
  data() {
    return {
      reservationInfo: {},
      reservationTime: "",
    };
  },
  created() {
    GetReservationById({ reservationId: this.$route.query.reservationId }).then(
      (res) => {
        // console.log(res);
        if (res.status === 200) {
          this.reservationInfo = res.data;
          this.reservationTime =
            this.reservationInfo.start_time +
            "-" +
            this.reservationInfo.end_time.slice(9);
        }
      }
    );
  },
};
</script>
<style lang="stylus" scoped>
.container {
  margin: 0.25rem;
  background: #fff;
  border-radius: 0.2rem;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  height: 7.2rem;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;

    .van-icon {
      margin-top: 0.5rem;
    }

    .location {
      color: $greyColor;
      margin: 0.1rem 0 0.2rem;
    }

    .title {
      font-size: 0.18rem;
      letter-spacing: 0.06rem;
      height: 0.3rem;
      line-height: 0.3rem;
    }
  }

  .space {
    width: 100%;
    height: 1px;
    background-color: $greyColor;
    margin: 0.4rem 0;
  }

  .footer {
    padding: 0.4rem;

    .info {
      font-size: 0.15rem;
      font-weight: 500;
      height: 0.4rem;
      line-height: 0.4rem;
    }

    .info-footer {
      text-align: center;
      margin-top: 0.4rem;
    }
  }
}
</style>
