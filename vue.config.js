const path = require("path");

// const IS_PROD = process.env.NODE_ENV === "production";
const IS_PROD = false;

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  pages: {
    index: {
      entry: IS_PROD ? "src/index.ts" : "example/main.ts",
      template: "public/index.html",
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    externals: IS_PROD
      ? {
        vue: 'vue',
        'element-plus': 'element-plus'
      }
      : {}
  }
};
