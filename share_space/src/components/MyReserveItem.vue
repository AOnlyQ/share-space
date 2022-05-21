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
              "-" +
              reservationInfo.end_time.slice(9)
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
      <van-button
        type="primary"
        size="mini"
        :disabled="reservationInfo.status === 'success' ? false : true"
        :color="reservationInfo.status === 'success' ? '#F4D04B' : '#F7F7F7'"
        @click="cancelReserve"
      >
        {{ optStr }}
      </van-button>
    </div>
  </div>
</template>
<script>
import { CancelUserReservation } from "@/request/api";
export default {
  props: ["reservationInfo"],
  data() {
    return {
      optStr: "取消预约",
    };
  },
  created() {
    // console.log("reservationInfo", this.reservationInfo);
    // 判断订单状态，决定可进行的操作
    if (this.reservationInfo.status === "success") {
      this.optStr = "取消预约";
    } else if (this.reservationInfo.status === "invalid") {
      this.optStr = "已失效";
    } else if (this.reservationInfo.status === "cancel") {
      this.optStr = "已取消";
    }
  },

  methods: {
    cancelReserve() {
      this.$dialog
        .confirm({
          title: "确认取消预约？",
          // message: `确认预约${this.seatData.code}号座位?`,
        })
        .then(() => {
          CancelUserReservation({
            userId: this.$store.state.userInfo._id,
            id: this.reservationInfo._id.toString(),
          }).then((res) => {
            console.log(res);
            if (res.status === 204) {
              // 取消成功，刷新页面
              this.$router.go(0);
            }
          });
        })
        .catch(() => {});
    },
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
