<template>
  <div class="container">
    <div class="row header">
      <div class="left">
        {{ orderInfo.combosInfo[0].name }}
      </div>
      <div
        class="right"
        :style="
          orderInfo.status === 'success' ? 'color:#58C46C' : 'color:#EE4040'
        "
      >
        {{ orderInfo.status === "success" ? "交易成功" : "交易失败" }}
      </div>
    </div>
    <div class="row">
      <div class="left">{{ orderInfo.combosInfo[0].consumableNum }}</div>
      <!-- <div class="right">{{ orderInfo.status }}</div> -->
    </div>
    <div class="row">
      <div class="left">{{ orderInfo.createdAt | dateFormat }}</div>
      <div class="right">
        合计{{ orderInfo.combosInfo[0].price | RMBformat }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["orderInfo"],
};
</script>
<style lang="stylus" scoped>
.container {
  padding: 0.1rem 0.2rem;
  border-bottom: 0.01rem solid #ccc;
  background: #fff;

  .row {
    display: flex;
    justify-content: space-between;
    margin: 0.04rem 0;
    font-size: 0.13rem;
    color: #888;
  }

  .header {
    font-size: 0.18rem;

    .left {
      color: #000;
    }
  }
}
</style>
