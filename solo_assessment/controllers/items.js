const { Item } = require("../models");

class ItemController {
  async getItems(req, res, next) {
    try {
      const data = await Item.find();

      if (data.length === 0) {
        return next({ message: "No items found", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createItem(req, res, next) {
    try {
      const data = await Item.create(req.body);

      const findItem = await Item.find({
        _id: data._id,
      });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req, res, next) {
    try {
      const data = await Item.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!data) {
        return next({ message: "Item not found", statusCode: 404 });
      }

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const data = await Item.findOneAndDelete({ _id: req.params.id });

      if (data.nModified === 0) {
        return next({ statusCode: 404, message: "Item not found" });
      }

      res.status(200).json({ message: "Item successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItemController();
