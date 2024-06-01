// /Users/abiezerreyes/Projects/JewelryWebsite2/client/vue.config.js

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
        "@/services": path.resolve(__dirname, "src/api/services"),
        "@/api": path.resolve(__dirname, "src/api"),
        "@/components": path.resolve(__dirname, "src/components"),
        "@/views": path.resolve(__dirname, "src/views"),
        "@/store": path.resolve(__dirname, "src/store"),
        "@/router": path.resolve(__dirname, "src/router"),
        "@/assets": path.resolve(__dirname, "src/assets"),
        "@/utils": path.resolve(__dirname, "src/api/utils"),
      },
    },
  },
};
