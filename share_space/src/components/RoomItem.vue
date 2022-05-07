<template>
  <div class="room-item">
    <div class="left">
      <img :src="roomdata.img_url" alt="" />
    </div>
    <div class="right">
      <div class="title">{{ roomdata.name }}</div>
      <div class="des-item">介绍：{{ roomdata.description }}</div>
      <div class="des-item">时间：{{ roomdata.time }}</div>

      <div class="des-item">座位总数：{{ roomdata.remainings }}</div>
      <van-button round type="default" color="#F4D04B" @click="reserveBtnClick"
        >预约</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "RoomItem",
  props: ["roomdata"],
  methods: {
    reserveBtnClick() {
      this.$router.push("/reserve?id=" + this.roomdata._id);
    },
  },
};
</script>
<style lang="stylus" scoped>
.room-item {
  display: flex;
  height: 1.1rem;
  background: #fff;
  margin-top: 0.02rem;
  padding: 0.1rem 0;

  .left {
    flex: 4;
    margin: 0 0.1rem;

    img {
      width: 100%;
      height: 100%;
      border-radius: 0.15rem;
      overflow: hidden;
    }
  }

  .right {
    flex: 6;
    position: relative;
    margin-right: 0.1rem;

    .title {
      font-size: 0.18rem;
      margin: 0.08rem 0;
    }

    .des-item {
      font-size: 0.13rem;
      color: #888;
      margin: 0.05rem 0;
    }

    .van-button {
      height: 0.3rem;
      color: #000;
      position: absolute;
      right: 0;
      bottom: 0;
      // background: $bgColor;
    }
  }
}
</style>
