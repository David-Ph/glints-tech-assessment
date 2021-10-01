const { Item } = require("../../models");
const itemCategory = require("../../config/itemCategory.json");
const mongoose = require("mongoose");
const validator = require("validator");

class ItemValidator {
  async create(req, res, next) {
    try {
      // if req.body.field is null/undefined, assign it an empty string
      // this is simply to avoid validator error: expected a string but received an undefied
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

      if (!validator.isInt(req.body.stock.toString(), { min: 0 })) {
        errorMessages.push("Item stock has to be positive integer");
      }

      if (!validator.isInt(req.body.price.toString(), { min: 0 })) {
        errorMessages.push("Item price has to be positive integer");
      }

      if (!itemCategory.includes(req.body.category)) {
        errorMessages.push("Invalid item category");
      }

      // Initialize previousStock as req.body.stock
      // this will also prevent malicious user from directly
      // inputting previousStock and create inconsistencies
      req.body.previousStock = req.body.stock;

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const errorMessages = [];

      if (req.params.id) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          errorMessages.push("Please enter valid id");
        }
      }

      if (req.query.dateMin) {
        if (!validator.isDate(req.query.dateMin)) {
          errorMessages.push("Please enter proper date for dateMin query");
        }
      }

      if (req.query.dateMax) {
        if (!validator.isDate(req.query.dateMax)) {
          errorMessages.push("Please enter proper date for dateMin query");
        }
      }

      if (req.query.limit) {
        if (!validator.isInt(req.query.limit)) {
          errorMessages.push("Please enter proper number for limit query");
        }
      }

      if (req.query.page) {
        if (!validator.isInt(req.query.page)) {
          errorMessages.push("Please enter proper number for page query");
        }
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      // find item first and fill it to missing req.body
      // this is to avoid user not sending a field when updating
      const findItem = await Item.findOne({ _id: req.params.id });
      if (!findItem) {
        return next({ statusCode: 404, message: "Item not found" });
      }
      req.body.name = req.body.name ?? findItem.name;
      req.body.stock = req.body.stock ?? findItem.stock;
      req.body.price = req.body.price ?? findItem.price;
      req.body.category = req.body.category ?? findItem.category;

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

      if (!itemCategory.includes(req.body.category)) {
        errorMessages.push("Invalid item category");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      req.body.stock = req.body.stock || 0;

      const errorMessages = [];

      if (!validator.isInt(req.body.stock.toString())) {
        errorMessages.push("Please enter an integer");
      }

      const findItem = await Item.findOne({ _id: req.params.id });
      if (!findItem) {
        return next({ statusCode: 404, message: "Item not found" });
      }
      // get new stock by adding previous stock and modified stock
      req.body.stock = parseInt(findItem.stock) + parseInt(req.body.stock);

      // new stock shouldn't be less than 0
      if (req.body.stock < 0) {
        errorMessages.push("Not enough stock!");
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
