module.exports = {
  css: {
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/common/stylus/color.styl` 这个文件，需要在没有vue文件中import
        import: "~@/assets/styles/variables.styl",
      },
    },
  },

  devServer: {
    host: "localhost",
    port: 8089,
    proxy: {
      "/api": {
        // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
        target: "https://assets.gitee.com/",
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
