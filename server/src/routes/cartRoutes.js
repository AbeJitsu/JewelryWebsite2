// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/cart", cartController.getCart);
router.post("/cart/add", cartController.addItemToCart);

module.exports = router;
