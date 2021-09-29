const express = require("express");
const app = require("../app");
const router = express.Router();

// ? import controllers
// //////////////////////
const ItemController = require("../controllers/items");

// ? import validators
// ////////////////////

// ? set routers
// //////////////
router.get("/", ItemController.getItems);
router.post("/", ItemController.createItem);
router.put("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);
// ? export router
//////////////////
module.exports = router;
//
