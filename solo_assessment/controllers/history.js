const { History } = require("../models");

class HistoryController {
  async getHistories(req, res, next) {
    try {
      // filter by date

      const query = {};

      // get specific item histories
      if (req.params.id) query.item = req.params.id;

      // sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      // pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      const data = await History.find(query)
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount)
        .populate("item", "name -_id");

      const count = await History.count(query);

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Histories not found" });
      }

      res.status(200).json({ data, count });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HistoryController();
