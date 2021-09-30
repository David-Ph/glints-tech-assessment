const { History } = require("../models");

class HistoryController {
  async getHistories(req, res, next) {
    try {
      const data = await History.find().populate("item", "name category price");

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Histories not found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getHistoryByItem(req, res, next) {
    try {
      const data = await History.find({ item: req.params.id }).populate(
        "item",
        "name category price"
      );

      if (!data) {
        return next({ statusCode: 404, message: "History not found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HistoryController();
