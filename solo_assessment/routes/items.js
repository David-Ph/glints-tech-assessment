const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////
const ItemController = require("../controllers/items");
const HistoryController = require("../controllers/history");

// ? import validators
// ////////////////////
const ItemValidator = require("../middlewares/validators/items");

// ? set routers
// //////////////
router.get("/", ItemController.getItems);
router.get("/detail/:id", ItemValidator.get, ItemController.getOneItem);

router.post("/", ItemValidator.create, ItemController.createItem);

router.put("/:id", ItemValidator.update, ItemController.updateItem);
router.put(
  "/updateStock/:id",
  ItemValidator.updateStock,
  ItemController.updateStock
);

router.delete("/:id", ItemController.deleteItem);

router.get("/history", HistoryController.getHistories);
router.get("/history/:id", HistoryController.getHistoryByItem);
// ? export router
//////////////////
module.exports = router;
//
