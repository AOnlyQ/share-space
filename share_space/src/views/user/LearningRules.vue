<template>
  <div>
    <AppNavBar title="学习公约" />
    <img src="http://175.178.87.164:8888/down/sYzEVMwOGVHx" alt="" />
    <img src="http://175.178.87.164:8888/down/9eGdMTh8ifLO" alt="" />
    <div class="container">
      <div>
        <p>
          1.小伙伴们可以在公共休息区内就餐，饭菜、米粉有味道食物不要带进学习区哟~
          (ps螺蛳粉这种大杀器会让这里成为毒区)
        </p>
        <p>
          2.就餐后的垃圾请放到他们该去的地方，没错就是他们最爱的垃圾桶怀抱里
        </p>
        <p>3.用完的微波炉请及时关闭，微波炉先生表示他想多休息</p>
        <p>4.公共区尽量控制说话分贝，要不然可能会掐灭某个小伙伴灵感的火花</p>
        <p>
          5.咖啡茶水小零食都是免费不限量提供，还会有不定期水果蛋糕下午茶福利!
        </p>
      </div>
      <img src="http://175.178.87.164:8888/down/jj8oDcyNildm" alt="" />
      <div>
        <p>
          1.请妥善保管随身物品。监控虽有，但是坏人也要提防。离开座位贵重物品一定要拿走拿走!
        </p>
        <p>2.学习完毕,请关灯及时拿走桌面垃圾。替店长小姐姐说句感谢了!</p>
        <p>3.有问题就找店长小姐姐，总之就是找她找她</p>
      </div>
    </div>
  </div>
</template>
<script>
import AppNavBar from "@/components/AppNavBar.vue";
export default {
  components: { AppNavBar },
};
</script>
<style lang="stylus" scoped>
img {
  width: 100%;
}

.container {
  background: #fff;
  padding: 0.3rem 0.2rem;

  p {
    line-height: 0.18rem;
    margin-bottom: 0.2rem;
  }
}
</style>
