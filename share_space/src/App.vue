<template>
  <div id="app">
    <!-- <div id="nav"><router-link to="/"></router-link></div> -->
    <router-view />
  </div>
</template>

<style lang="stylus">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #fff;
  min-height: 100%;
  font-size: 0.14rem;
  // min-height: 100%;
}

html, body {
  height: 100%;
}

html {
  font-size: 100px !important;
}
</style>
