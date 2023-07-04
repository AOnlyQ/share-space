<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="编辑资料"
        left-arrow
        right-text="确定"
        @click-left="onClickLeft"
        @click-right="save"
      >
      </van-nav-bar>
    </van-sticky>
    <van-field v-model="username" placeholder="请输入用户名" />
  </div>
</template>
<script>
import { EditUserInfo } from "@/request/api.js";
export default {
  props: [],
  data() {
    return {
      username: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    save() {
      if (this.username === this.$store.state.userInfo.username) {
        this.$toast.fail("请不要与原用户名相同！");
        return false;
      }
      EditUserInfo({
        _id: this.$store.state.userInfo._id,
        username: this.username,
      }).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.$toast.success("修改用户名成功！");
          // 用户信息修改了，将localStorage中的也进行修改
          window.localStorage.setItem("userInfo", JSON.stringify(res.data));
          this.$store.commit("setUserInfo", res.data);
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.van-nav-bar {
  background: $bgColor;

  /deep/ .van-nav-bar__title, /deep/ .van-icon, /deep/ .van-nav-bar__text {
    color: #fff;
  }
}

.van-button {
  // margin: 0.1rem;
  height: 80%;
  color: #000;
  // position: absolute;
  // right: 0;
  // bottom: 0;
  // background: $bgColor;
}
</style>
