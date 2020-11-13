const express = require("express");
const router = express.Router();
const stockController = require("./stockController");
// const cors = require('cors');

console.log("router loaded");

router.get("/printStocks", stockController.printStocks);
router.get("/search", stockController.humanReadableSearch);
router.get("/filterStocks", stockController.filterStocks);

router.post("/setStock", stockController.setStock);
router.post("/addStock", stockController.addStock);
router.post("/getStock", stockController.getStock);

module.exports = router;