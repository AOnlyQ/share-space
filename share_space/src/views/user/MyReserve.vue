<template>
  <div>
    <AppNavBar title="我的预约" />
    <van-loading
      class="my-van-loading"
      size="24px"
      type="spinner"
      color="#F4D04B"
      v-show="loadingVisible"
      >加载中...</van-loading
    >
    <MyReserveItem
      v-for="item in reservationList"
      :key="item._id"
      :reservationInfo="item"
    />
    <div class="footer" v-show="!loadingVisible">
      -------我是有底线的-------
    </div>
  </div>
</template>
<style lang="stylus">

.footer {
  text-align: center;
  height: 0.4rem;
  line-height: 0.4rem;
  color: #333;
}
</style>
<script>
import { GetUserReservationList } from "@/request/api";
import AppNavBar from "@/components/AppNavBar.vue";
import MyReserveItem from "@/components/MyReserveItem";
export default {
  components: { AppNavBar, MyReserveItem },
  data() {
    return {
      loadingVisible: true,
      reservationList: [],
    };
  },
  created() {
    GetUserReservationList({ userId: this.$store.state.userInfo._id }).then(
      (res) => {
        // console.log(res);
        if (res.status === 200) {
          this.reservationList = res.data;
          this.loadingVisible = false;
        }
      }
    );
  },
};
</script>
