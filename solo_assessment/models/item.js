const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name can't be empty"],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
      required: [true, "Stock can't be empty"],
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
      required: [true, "Price can't be empty"],
    },
    category: {
      type: String,
      required: [true, "Category can't be empty"],
    },
    previousStock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON: {
      versionKey: false,
    },
  }
);

itemSchema.statics.createHistoryEntry = async function (item) {
  try {
    // check if stock has been updated
    if (item.previousStock === item.stock) {
      return;
    }
    // create new history
    const newHistory = await this.model("History").create({
      item: item._id,
      previousStock: item.previousStock,
      modifiedBy: parseInt(item.stock) - parseInt(item.previousStock),
      newStock: item.stock,
    });

    item.previousStock = item.stock;
    await item.save();
  } catch (error) {
    next(error);
  }
};

itemSchema.post("findOneAndUpdate", function (doc) {
  // check if stock has changed
  doc.constructor.createHistoryEntry(doc);
});

module.exports = mongoose.model("Item", itemSchema);
