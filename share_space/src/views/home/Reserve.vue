<template>
  <div>
    <AppNavBar title="选择座位" />

    <van-image width="100%" height="300" :src="roomInfo.img_url" />
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
      <div class="cell-container">
        <van-cell title="自习室场馆" :value="roomInfo.name" />
        <van-cell
          title="预约日期"
          :value="reserveDateStr"
          @click="calendarVisible = true"
          is-link
        />
      </div>

      <van-calendar
        v-model="calendarVisible"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmDate"
      />
      <van-row class="">
        <van-col span="9" @click="chooseStartTime">
          {{ startTime ? startTime : "开始学习时间" }}
        </van-col>
        <van-col span="6">预约时间</van-col>
        <van-col span="9" @click="chooseEndTime">
          {{ endTime ? endTime : "结束学习时间" }}
        </van-col>
      </van-row>
      <div class="seat-title">选座</div>
      <div class="seats-container" v-if="seatsStatus.length">
        <Seat
          v-for="item in roomInfo.seats"
          :key="item._id"
          :seatData="item"
          :seatStatus="getSeatStatus(item._id)"
        />
      </div>
    </div>
    <van-datetime-picker
      v-model="curStartTime"
      v-show="startPickerVisible"
      type="time"
      title="选择开始时间"
      :filter="filterTime"
      :min-hour="7"
      :max-hour="23"
      @confirm="confirmStartTime"
      @cancel="startPickerVisible = false"
    />
    <van-datetime-picker
      v-model="curEndTime"
      v-show="endPickerVisible"
      type="time"
      title="选择结束时间"
      :filter="filterTime"
      :min-hour="7"
      :max-hour="23"
      @confirm="confirmEndTime"
      @cancel="endPickerVisible = false"
    />
  </div>
</template>
<script>
import AppNavBar from "@/components/AppNavBar";
import Seat from "@/components/Seat.vue";
import { GetRoomInfo, GetSeatsStatus } from "@/request/api.js";
export default {
  components: { AppNavBar, Seat },
  data() {
    return {
      calendarVisible: false,
      startPickerVisible: false,
      endPickerVisible: false,
      // 日期选择器绑定的数据
      reserveDate: new Date(),
      reserveDateStr: "",
      minDate: {},
      maxDate: {},
      curDateTime: new Date(),
      // 选择后，显示出来的数据模型
      startTime: "",
      endTime: "",
      // 时间选择器绑定的数据，不能与上面用同一个，因为选择了时间后，若点了取消，也会将这个没有校验的时间值给赋值上去
      curStartTime: "",
      curEndTime: "",
      // 当前自习室的一些信息
      roomInfo: {},
      // 当前自习室所有座位状态
      seatsStatus: [],
    };
  },
  created() {
    // 设置可选日期为今天开始的三天中
    this.setOptionalDate();
    // 根据自习室id查询相关自习室信息
    GetRoomInfo({ id: this.$route.query.id }).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        this.roomInfo = res.data;
      }
    });
  },
  methods: {
    getSeatStatus(id) {
      return this.seatsStatus.find((item) => item.seatId === id);
    },
    setOptionalDate() {
      // 可选的预约时间为后一天开始的三天内
      this.minDate = new Date();
      // this.minDate.setTime(this.minDate.getTime() + 1 * 24 * 60 * 60 * 1000);
      // 获取三天后的日期
      this.maxDate = new Date();
      this.maxDate.setTime(this.maxDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirmDate(date) {
      this.calendarVisible = false;
      this.reserveDate = date;
      this.reserveDateStr = this.formatDate(date);
    },
    filterTime(type, options) {
      // 设置分只有00可选，这样好处理数据
      if (type === "minute") {
        return options.filter((option) => option % 60 === 0);
      }
      return options;
    },
    chooseStartTime() {
      this.curStartTime = this.startTime;
      // 没有选择日期提示先选择日期
      if (!this.reserveDateStr) {
        this.$toast("请先选择预约日期!");
      } else {
        this.startPickerVisible = true;
      }
    },
    chooseEndTime() {
      this.curEndTime = this.endTime;
      this.endPickerVisible = true;
    },
    confirmStartTime() {
      // 选择完预约日期后，如果选择的日期为当天，则只能选择此刻之后的时间
      let reDay = this.reserveDate.getDate();
      let curDay = this.curDateTime.getDate();
      let reSHour = this.curStartTime.slice(0, 2);
      let curHour = this.curDateTime.getHours();
      // console.log("reSHour:", reSHour, "curHour", curHour);
      if (reDay === curDay && reSHour <= curHour) {
        this.$toast(`请选择${curHour}点后的时间!`);
      } else {
        this.startTime = this.curStartTime;
        this.startPickerVisible = false;
      }
    },
    confirmEndTime() {
      let reSHour = this.curStartTime.slice(0, 2);
      let reEHour = this.curEndTime.slice(0, 2);
      // 校验结束时间是否大于开始时间
      if (reEHour <= reSHour) {
        this.$toast(`结束时间需大于开始时间(${reSHour}点)!`);
      } else {
        this.endTime = this.curEndTime;
        this.endPickerVisible = false;
        // 选择好时间后，根据传的时间段，查询这个时间段的当前自习室的所有座位状态
        GetSeatsStatus({
          input_start: this.reserveDateStr + " " + this.startTime,
          input_end: this.reserveDateStr + " " + this.endTime,
          roomId: this.$route.query.id,
        }).then((res) => {
          // console.log("res", res);
          if (res.status === 200) {
            this.seatsStatus = res.data;
          }
        });
      }
      // console.log("this.endTime", this.endTime);
    },
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

  .cell-container {
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
