<template>
  <div>
    <AppNavBar title="我的预约" />
    <MyReserveItem
      v-for="item in reservationList"
      :key="item._id"
      :reservationInfo="item"
    />
    <div class="footer">-------我是有底线的-------</div>
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
      reservationList: [],
    };
  },
  created() {
    GetUserReservationList({ userId: this.$store.state.userInfo._id }).then(
      (res) => {
        console.log(res);
        if (res.status === 200) {
          this.reservationList = res.data;
        }
      }
    );
  },
};
</script>
