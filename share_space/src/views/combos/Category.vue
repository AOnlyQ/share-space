<template>
  <div>
    <van-sticky>
      <van-nav-bar title="套餐" />
      <van-tabs v-model="active">
        <van-tab title="全部套餐">内容 1</van-tab>
        <van-tab title="小时">内容 2</van-tab>
        <van-tab title="包天">内容 3</van-tab>
        <van-tab title="包月">内容 4</van-tab>
      </van-tabs>
    </van-sticky>
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <div style="height: 0.5rem"></div>
      <div class="package-container">
        <PackcgeItem
          v-for="item in packageList"
          :key="item.id"
          :packageData="item"
        />
      </div>
    </van-pull-refresh>
  </div>
</template>
<style lang="stylus" scoped>
.package-container {
  position: relative;
  bottom: 0.5rem;
}
</style>
<script>
import PackcgeItem from "@/components/PackageItem.vue";
// import combosList from "@/db/combos";
import { GetComboList } from "@/request/api";
export default {
  components: { PackcgeItem },
  data() {
    return {
      isLoading: false,
      active: 2,
      packageList: [],
    };
  },
  created() {
    this.getCombosList();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    getCombosList() {
      GetComboList().then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.packageList = res.data;
        }
      });
      // this.packageList = combosList;
    },
  },
};
</script>
