const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////
const ItemController = require("../controllers/items");

// ? import validators
// ////////////////////
const ItemValidator = require("../middlewares/validators/items");

// ? set routers
// //////////////
router.get("/", ItemController.getItems);
router.get("/:id", ItemValidator.get, ItemController.getOneItem);
router.post("/", ItemValidator.create, ItemController.createItem);
router.put("/:id", ItemValidator.update, ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);
// ? export router
//////////////////
module.exports = router;
//
