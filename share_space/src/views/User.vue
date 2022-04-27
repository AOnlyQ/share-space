<template>
  <div>
    <van-sticky>
      <van-nav-bar title="个人中心" />
    </van-sticky>
    <van-row>
      <van-col span="6">
        <img :src="avatarSrc" alt="" />
      </van-col>
      <van-col span="15">{{ userInfo.username }}</van-col>
      <van-col span="3">
        <van-icon name="edit" />
      </van-col>
    </van-row>
    <van-grid :column-num="3" square style="margin: 0.1rem 0">
      <van-grid-item>
        <img
          src="@/assets/icon-img/time.png"
          alt=""
          style="height: 50%; margin-bottom: 0.06rem"
        />
        剩余套餐
      </van-grid-item>
      <van-grid-item icon="photo-o">
        <img
          src="@/assets/icon-img/coupons.png"
          alt=""
          style="height: 50%; margin-bottom: 0.06rem"
        />
        团购验券
      </van-grid-item>
      <van-grid-item icon="photo-o">
        <img
          src="@/assets/icon-img/records.png"
          alt=""
          style="height: 50%; margin-bottom: 0.06rem"
        />
        学习记录
      </van-grid-item>
    </van-grid>
    <div>
      <van-cell title="我的预约" icon="todo-list-o" is-link />
      <van-cell
        title="我的订单"
        icon="notes-o"
        is-link
        style="margin-bottom: 0.1rem"
      />
      <van-cell title="学习公约" icon="completed" is-link />
      <van-cell title="联系客服" icon="friends-o" is-link />
      <van-cell title="用户协议" icon="description" is-link />
      <van-cell title="隐私政策" icon="goods-collect-o" is-link />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarSrc: require("@/assets/avatar.jpg"),
      userInfo: {},
    };
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    console.log("userInfo", this.userInfo);
  },
  methods: {},
};
</script>
<style lang="stylus" scoped>
.van-row {
  padding: 0.2rem 4%;
  background: #333;
  color: #fff;

  .van-col {
    line-height: 0.7rem;
    font-size: 0.18rem;

    img {
      width: 0.7rem;
      border-radius: 50%;
      display: block;
    }

    &:last-child {
      text-align: right;
    }
  }
}
</style>
