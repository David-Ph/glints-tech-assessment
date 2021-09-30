const { Item } = require("../models");

class ItemController {
  async getItems(req, res, next) {
    try {
      // price filter
      const priceMin = parseInt(req.query.priceMin) || 0;
      const priceMax = parseInt(req.query.priceMax) || 1000000000;

      // stock filter
      const stockMin = parseInt(req.query.stockMin) || 0;
      const stockMax = parseInt(req.query.stockMax) || 100000;

      const query = {
        price: { $gte: priceMin, $lte: priceMax },
        stock: { $gte: stockMin, $lte: stockMax },
      };

      // category filter
      if (req.query.category) query.category = req.query.category;

      // sorting
      const sortField = req.query.sortBy || "created_at";
      const orderBy = req.query.orderBy || "desc";

      // pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 5;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // find data
      const data = await Item.find(query)
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      const count = await Item.count(query);

      if (data.length === 0) {
        return next({ message: "No items found", statusCode: 404 });
      }

      res.status(200).json({ data, count });
    } catch (error) {
      next(error);
    }
  }

  async getOneItem(req, res, next) {
    try {
      const data = await Item.findOne({ _id: req.params.id });

      if (!data) {
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

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      const data = await Item.findOneAndUpdate(
        { _id: req.params.id },
        { stock: req.body.stock },
        { new: true }
      );

      res.status(201).json({ data });
    } catch (error) {}
  }

  async deleteItem(req, res, next) {
    try {
      const data = await Item.findOneAndDelete({ _id: req.params.id });

      if (!data) {
        return next({ statusCode: 404, message: "Item not found" });
      }

      res.status(200).json({ message: "Item successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItemController();
