<template>
  <div>
    test

    <img src="http://175.178.87.164:8888/down/VTSDXiDW419Z" alt="" />
    <img src="http://175.178.87.164:8888/down/ZCtDsYhkdnyI" alt="" />
    <img :src="avatarSrc" alt="" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      // test:,
      avatarSrc: require("@/assets/avatar.jpg"),
    };
  },
};
</script>
