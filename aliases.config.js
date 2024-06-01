// /Users/abiezerreyes/Projects/JewelryWebsite2/aliases.config.js

const moduleAlias = require("module-alias");
const path = require("path");

const baseDir = path.join(__dirname, "server/src");

moduleAlias.addAliases({
  "@": baseDir,
  "@/services": path.join(baseDir, "services"),
  "@/api": path.join(baseDir, "api"),
  "@/controllers": path.join(baseDir, "api/controllers"),
  "@/middleware": path.join(baseDir, "api/middleware"),
  "@/models": path.join(baseDir, "api/models"),
  "@/routes": path.join(baseDir, "api/routes"),
  "@/config": path.join(baseDir, "config"),
  "@/tests": path.join(baseDir, "tests"),
  "@/utilities": path.join(baseDir, "utilities"),
});
