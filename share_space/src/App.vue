<template>
  <div id="app">
    <router-view />
    <AppTabbar v-if="this.$route.meta.level === 2" />
  </div>
</template>

<style lang="stylus">
#app {
  min-height: 100%;
  font-size: 0.14rem;
  background-color: #F4F4F4;
}

html, body {
  height: 100%;
}

html {
  font-size: 100px !important;
}
</style>
<script>
import AppTabbar from "@/components/AppTabbar.vue";
export default {
  components: { AppTabbar },
};
</script>
