<template>
  <div class="container">
    <div class="title">{{ comboInfo[0].name }}</div>
    <!-- <div>{{comboInfo[0]}}</div> -->
    <div class="footer">
      <div>到馆签到后开通使用</div>
      <van-button
        type="primary"
        size="mini"
        color="#F4D04B"
        @click="$router.push('/comboDetailInfo?id=' + comboInfo[0]._id)"
        >详情</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  props: ["comboInfo"],
};
</script>
<style lang="stylus" scoped>
.container {
  background: #fff;
  padding: 0.1rem 0.2rem;
  border-bottom: 0.01rem solid #ccc;

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 0.15rem;

    .van-button {
      color: #000 !important;
      border-color: #ddd !important;
    }
  }
}

.title {
  font-size: 0.18rem;
}
</style>
