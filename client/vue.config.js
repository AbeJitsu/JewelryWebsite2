const path = require("path");

module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
};

// /Users/abiezerreyes/Projects/JewelryWebsite2/client/vue.config.js
