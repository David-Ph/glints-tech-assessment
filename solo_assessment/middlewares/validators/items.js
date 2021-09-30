const { Item } = require("../../models");
const itemCategory = require("../../config/itemCategory.json");
const mongoose = require("mongoose");
const validator = require("validator");

class ItemValidator {
  async create(req, rex, next) {
    try {
      req.body.name = req.body.name ?? "";
      req.body.price = req.body.price ?? "";
      req.body.stock = req.body.stock ?? "";
      req.body.category = req.body.category ?? "";

      const errorMessages = [];

      if (!validator.isLength(req.body.name, { min: 3, max: 25 })) {
        errorMessages.push("Item name can only be between 3 to 25 characters");
      }

      if (
        !validator.isAlphanumeric(req.body.name, "en-US", {
          ignore: " ",
        })
      ) {
        errorMessages.push("Item name can only contains alphabets and numbers");
      }

      if (!validator.isInt(req.body.stock, { min: 0 })) {
        errorMessages.push("Item stock has to be positive integer");
      }

      if (!validator.isInt(req.body.price, { min: 0 })) {
        errorMessages.push("Item price has to be positive integer");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async get(req, rex, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next({ message: "id is not valid", statusCode: 400 });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async update(req, rex, next) {
    try {
      const findItem = await Item.findOne({ _id: req.params.id });
      req.body.name = req.body.name || findItem.name;
      req.body.stock = req.body.stock || findItem.stock;
      req.body.price = req.body.price || findItem.price;
      req.body.category = req.body.category || findItem.category;

      const errorMessages = [];

      if (!validator.isLength(req.body.name, { min: 3, max: 25 })) {
        errorMessages.push("Item name can only be between 3 to 25 characters");
      }

      if (
        !validator.isAlphanumeric(req.body.name, "en-US", {
          ignore: " ",
        })
      ) {
        errorMessages.push("Item name can only contains alphabets and numbers");
      }

      if (!validator.isInt(req.body.stock.toString(), { min: 0 })) {
        errorMessages.push("Item stock has to be positive integer");
      }

      if (!validator.isInt(req.body.price.toString(), { min: 0 })) {
        errorMessages.push("Item price has to be positive integer");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItemValidator();
