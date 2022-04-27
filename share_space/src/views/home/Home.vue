<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar title="首页" />
    </van-sticky>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(value, index) in swiperData" :key="index">
        <img v-lazy="value" />
      </van-swipe-item>
    </van-swipe>
    <div style="height: 50px"></div>
    <div class="room">
      <RoomItem v-for="item in roomList" :key="item._id" :roomdata="item" />
    </div>
  </div>
</template>
<script>
import RoomItem from "@/components/RoomItem.vue";
import { GetRoomList } from "@/request/api";
import roomsList from "@/db/room.js";
export default {
  components: { RoomItem },
  data() {
    return {
      swiperData: [
        require("@/assets/images/swiper1.jpg"),
        require("@/assets/images/swiper2.jpg"),
        require("@/assets/images/swiper3.jpg"),
        require("@/assets/images/swiper4.jpg"),
        require("@/assets/images/swiper5.jpg"),
        require("@/assets/images/swiper6.jpg"),
      ],
      roomList: [],
    };
  },
  created() {
    this.getRoomList();
  },
  methods: {
    getRoomList() {
      GetRoomList().then((res) => {
        console.log(res);
        // this.roomList = res.data;
      });
      this.roomList = roomsList;
      console.log("tets", this.roomList);
    },
  },
};
</script>
<style lang="stylus" scoped>
.van-swipe {
  margin: 0.1rem;
  border-radius: 0.15rem;

  .van-swipe-item {
    width: 100%;
    color: #fff;

    image {
      width: 100%;
    }
  }
}

.room {
  position: relative;
  bottom: 50px;
}
</style>
