<template>
  <div class="seat-item">
    <van-icon
      name="send-gift"
      size="40"
      :color="seatData.status ? 'green' : 'red'"
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
export default {
  props: ["seatData"],
  data() {
    return {
      // status:
    };
  },
  methods: {
    chooseSeat() {
      this.$dialog
        .confirm({
          title: "预约确认",
          message: `确认预约${this.seatData.code}号座位?`,
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
