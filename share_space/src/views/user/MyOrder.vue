<template>
  <div>
    <AppNavBar :title="'我的订单'" />
    <van-loading
      class="my-van-loading"
      size="24px"
      type="spinner"
      color="#F4D04B"
      v-show="loadingVisible"
      >加载中...</van-loading
    >
    <div v-if="!loadingVisible">
      <van-empty
        v-if="!orderList.length"
        description="暂无订单"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      />
      <OrderItem v-for="item in orderList" :key="item._id" :orderInfo="item" />
    </div>
  </div>
</template>
<script>
import AppNavBar from "@/components/AppNavBar";
import OrderItem from "@/components/OrderItem.vue";
import { GetUserOrderList } from "@/request/api";
export default {
  components: { AppNavBar, OrderItem },
  data() {
    return {
      loadingVisible: true,
      orderList: [],
    };
  },
  created() {
    GetUserOrderList(this.$store.state.userInfo).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        this.orderList = res.data;
        this.loadingVisible = false;
      }
    });
  },
};
</script>
<style lang="stylus" scoped></style>
