<template>
  <div>
    <AppNavBar title="我的套餐" />
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
      orderList: [],
    };
  },
  components: { AppNavBar, MyComboItem },
  created() {
    GetUserOrderList(this.$store.state.userInfo).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.orderList = res.data;
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
