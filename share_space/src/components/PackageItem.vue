<template>
  <!-- thumb="https://img01.yzcdn.cn/vant/ipad.jpeg" -->

  <van-card
    :thumb="thumbImg"
    :tag="packageData.tag"
    :price="packageData.price"
    :desc="packageData.desc"
    :title="packageData.name"
    :origin-price="packageData.origin_price"
    @click="packageClick(packageData._id)"
  />
</template>
<script>
export default {
  props: ["packageData"],
  data() {
    return {
      thumbImg: require("@/assets/bg2.png"),
      price: 2,
    };
  },
  created() {},
  methods: {
    packageClick(id) {
      this.$router.push("/comboDetail?id=" + id);
    },
  },
};
</script>
<style lang="stylus" scoped>
.van-tag--danger {
  background-color: $priceFontColor;
}

.van-card__title {
  line-height: 0.2rem;
  font-size: 0.16rem;
}

.van-card__price {
  color: $priceFontColor;
}

.van-card__desc {
  line-height: 0.16rem;
}

.van-ellipsis {
  overflow: visible;
  white-space: normal;
}
</style>
