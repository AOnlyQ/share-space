<template>
  <div>
    <AppNavBar title="学习记录" />
    <van-loading
      class="my-van-loading"
      size="24px"
      type="spinner"
      color="#F4D04B"
      v-show="loadingVisible"
      >加载中...</van-loading
    >
    <van-empty
      description="暂无学习记录"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
    />
    <div></div>
  </div>
</template>
<style lang="stylus" scoped></style>
<script>
import AppNavBar from "@/components/AppNavBar";
export default {
  components: { AppNavBar },
  data() {
    return {
      loadingVisible: true,
    };
  },
};
</script>
