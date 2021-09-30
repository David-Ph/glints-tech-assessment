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

module.exports = mongoose.model("Item", itemSchema);