<template>
  <div class="seat-item">
    <van-icon
      name="send-gift"
      size="40"
      :color="seatStatus.status === 'false' ? 'red' : 'green'"
      @click="chooseSeat"
    />
    <div style="font-size: 0.12rem">
      {{ seatData.code }}
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.seat-item {
  display: inline-block;
  width: 20%;
  height: 60px;
  text-align: center;
}
</style>
<script>
// eslint-disable-next-line no-unused-vars
import { AddUserReservation, GetUserComboList } from "@/request/api.js";
export default {
  props: ["seatData", "seatStatus"],
  data() {
    return {
      // status:
    };
  },
  created() {
    // console.log("this.seatStatus", this.seatStatus);
    // console.log("this.seatData", this.seatData);
  },
  methods: {
    chooseSeat() {
      // 根据当前座位的状态进行预约
      if (this.seatStatus.status == "true") {
        this.$dialog
          .confirm({
            title: "预约确认",
            message: `确认预约${this.seatData.code}号座位?`,
          })
          .then(() => {
            // on confirm·
            // 先检查用户套餐是否有效，再发送请求
            // GetUserComboList({
            //   id: this.$store.state.userInfo._id,
            // }).then((res) => {
            //   console.log(res);
            // });

            // 确认预约后,发送请求，将预约时间日期座位id传递过去
            AddUserReservation({
              start_time: this.seatStatus.start_time,
              end_time: this.seatStatus.end_time,
              userId: this.$store.state.userInfo._id,
              roomId: this.seatData.roomId,
              roomName: this.seatData.roomName,
              seatId: this.seatData._id,
              seatName: this.seatData.name,
            }).then((res) => {
              console.log("res:", res);
              if (res.data.status === 204) {
                this.$toast.success({ message: "预约成功", duration: 1000 });
                setTimeout(() => {
                  this.$router.push(
                    `/reserve_info?reservationId=${res.data.reservationId}`
                  );
                }, 0);
              } else if (res.data.status === 409) {
                this.$toast.fail("该时间段已预约座位，无法进行预约");
              }
            });
          })
          .catch(() => {
            // on cancel
            // console.log("取消预约");
          });
      } else {
        this.$toast.fail("此座位已占用");
      }
    },
  },
};
</script>
