<template>
  <div>
    <AppNavBar title="我的预约" />
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
import AppNavBar from "@/components/AppNavBar.vue";
export default {
  components: { AppNavBar },
};
</script>
