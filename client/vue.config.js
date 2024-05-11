// /Users/abiezerreyes/Documents/JewelryWebsite2/client/vue.config.js
const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
};
