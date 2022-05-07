<template>
  <div>
    <AppNavBar :title="'我的订单'" />
    <van-empty
      v-if="!orderList.length"
      description="暂无订单"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
    />
    <OrderItem v-for="item in orderList" :key="item._id" :orderInfo="item" />
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
      orderList: [],
    };
  },
  created() {
    GetUserOrderList(this.$store.state.userInfo).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        this.orderList = res.data;
      }
    });
  },
};
</script>
<style lang="stylus" scoped></style>
