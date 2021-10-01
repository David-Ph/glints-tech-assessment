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
router.get("/", ItemValidator.get, ItemController.getItems);
router.get("/detail/:id", ItemValidator.get, ItemController.getOneItem);

router.post("/", ItemValidator.create, ItemController.createItem);

router.put("/:id", ItemValidator.update, ItemController.updateItem);
router.put(
  "/updateStock/:id",
  ItemValidator.get,
  ItemValidator.updateStock,
  ItemController.updateStock
);

router.delete("/:id", ItemValidator.get, ItemController.deleteItem);

router.get("/history", ItemValidator.get, HistoryController.getHistories);
router.get("/history/:id", ItemValidator.get, HistoryController.getHistories);
// ? export router
//////////////////
module.exports = router;
//
