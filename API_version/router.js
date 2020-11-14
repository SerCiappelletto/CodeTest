const express = require("express");
const router = express.Router();
const stockController = require("./stockController");

router.get("/printStocks", stockController.printStocks); 

router.post("/search", stockController.humanReadableSearch);
router.post("/filter", stockController.filterStocks);
router.post("/setStock", stockController.setStock); 
router.post("/addStock", stockController.addStock); 
router.post("/getStock", stockController.getStock); 

module.exports = router;