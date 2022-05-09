<template>
  <div class="child-container" @click="btnClick">
    <van-icon :name="iconName" />
    <span>{{ text }}</span>
  </div>
</template>
<style lang="stylus" scoped>
.child-container {
  background: #eee;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  font-size: 0.16rem;
  padding: 0.1rem 0;
  border-radius: 0.06rem;

  .van-icon {
    margin-right: 0.04rem;
  }
}
</style>
<script>
export default {
  props: ["text", "iconName", "name"],
  created() {},
  methods: {
    btnClick() {
      if (this.name === "checkin") {
        this.$dialog
          .confirm({
            title: "确认签到",
            // message: `确认预约${this.seatData.code}号座位?`,
          })
          .then(() => {
            this.$toast.success("签到成功！");
          })
          .catch(() => {});
      }
    },
  },
};
</script>
