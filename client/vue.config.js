// /Users/abiezerreyes/Documents/JewelryWebsite2/client/vue.config.js

const path = require("path");

module.exports = {
  // Configure the dev server to proxy requests to the backend
  devServer: {
    proxy: "http://localhost:3000",
  },

  // Transpile dependencies - useful for certain packages that are not pre-compiled
  transpileDependencies: true,

  // Configure webpack settings
  configureWebpack: {
    resolve: {
      // Define aliases for directories
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
};

// /Users/abiezerreyes/Documents/JewelryWebsite2/client/vue.config.js
