<template>
  <div>
    <AppNavBar title="我的套餐" />
    <van-loading
      class="my-van-loading"
      size="24px"
      type="spinner"
      color="#F4D04B"
      v-show="loadingVisible"
      >加载中...</van-loading
    >
    <van-empty
      v-if="!orderList.length"
      description="暂无套餐"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
    />
    <div class="container">
      <MyComboItem
        :comboInfo="item.combosInfo"
        v-for="item in orderList"
        :key="item._id"
      />
    </div>
  </div>
</template>
<script>
import MyComboItem from "@/components/MyComboItem.vue";
import AppNavBar from "@/components/AppNavBar.vue";

import { GetUserOrderList } from "@/request/api";
export default {
  data() {
    return {
      loadingVisible: true,
      orderList: [],
    };
  },
  components: { AppNavBar, MyComboItem },
  created() {
    GetUserOrderList(this.$store.state.userInfo).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.orderList = res.data;
        this.loadingVisible = false;
      }
    });
  },
};
</script>
<style lang="stylus" scoped>
.container {
  padding: 0.2rem 0.15rem;
}
</style>
