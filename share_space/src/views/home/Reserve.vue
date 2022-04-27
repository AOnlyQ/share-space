<template>
  <div>
    <van-nav-bar title="选择座位" left-arrow @click-left="onClickLeft" />
    <van-image width="100%" height="300" :src="reserveData.img_url" />
    <div class="container">
      <div class="iconDes">
        <div>
          <van-icon name="send-gift" size="40" color="green" />
          <span>可预约</span>
        </div>
        <div>
          <van-icon name="send-gift" size="40" color="red" />
          <span>已占用</span>
        </div>
      </div>
      <van-cell title="预约日期" :value="date" @click="show = true" is-link />
      <van-calendar
        v-model="show"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
      <van-row class="">
        <van-col span="9" @click="chooseTime('start')">
          {{ startTime ? startTime : "开始学习时间" }}
        </van-col>
        <van-col span="6">预约时间</van-col>
        <van-col span="9" @click="chooseTime('end')">
          {{ endTime ? endTime : "结束学习时间" }}
        </van-col>
      </van-row>
      <div class="seat-title">选座</div>
      <div class="seats-container">
        <Seat v-for="item in seatsList" :key="item.num" :seatData="item" />
      </div>
    </div>
    <van-datetime-picker
      v-model="curStartTime"
      v-show="startPickerVisible"
      type="time"
      title="选择开始时间"
      :min-hour="7"
      :max-hour="21"
      @confirm="confirmTime('start')"
      @cancel="startPickerVisible = false"
    />
    <van-datetime-picker
      v-model="curEndTime"
      v-show="endPickerVisible"
      type="time"
      title="选择结束时间"
      :min-hour="7"
      :max-hour="21"
      @confirm="confirmTime('end')"
      @cancel="endPickerVisible = false"
    />
  </div>
</template>
<script>
import Seat from "@/components/Seat.vue";
import seatsList from "@/db/seats";
export default {
  components: { Seat },
  data() {
    return {
      reserveData: { img_url: require("@/assets/images/gejianshi.jpg") },
      show: false,
      startPickerVisible: false,
      endPickerVisible: false,
      date: "",
      minDate: new Date(),
      maxDate: new Date(2022, 8, 31),
      currentTime: "",
      startTime: "",
      endTime: "",
      curStartTime: "",
      curEndTime: "",
      seatsList: seatsList,
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    chooseTime(type) {
      if (type === "start") {
        this.curStartTime = this.startTime;

        this.startPickerVisible = true;
      } else {
        this.curEndTime = this.endTime;
        this.endPickerVisible = true;
      }
    },
    confirmTime(type) {
      if (type === "start") {
        this.startTime = this.curStartTime;
        console.log("this.startTime", this.startTime);
        this.startPickerVisible = false;
      } else {
        this.endTime = this.curEndTime;
        console.log("this.endTime", this.endTime);
        this.endPickerVisible = false;
      }
    },
    confirmStartTime() {},
  },
};
</script>
<style lang="stylus" scoped>
.van-nav-bar {
  background: $bgColor;

  /* /deep/ 就是把data-v-hash值选择器写到类名的前面 */
  /deep/ .van-nav-bar__title, /deep/ .van-icon {
    color: #fff;
  }
}

// navbar下的容器盒子
.container {
  padding: 0.1rem;

  .iconDes {
    display: flex;
    padding: 0.15rem;
    justify-content: space-around;
    align-items: center;
  }

  .van-cell {
    margin: 0.1rem 0;
  }

  .van-row {
    text-align: center;

    .van-col {
      height: 0.3rem;
      line-height: 0.3rem;
    }

    .van-col:nth-child(odd) {
      background-color: #F4D04B;
    }
  }

  .seat-title {
    font-size: 0.2rem;
    margin: 0.2rem 0 0.1rem;
  }

  .seats-container {
    padding: 0.1rem 0;
    background: #fff;
    color: #000;
    border-top: 1px solid transparent;
  }
}

.van-datetime-picker {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
