const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Types.ObjectId,
      ref: "Item",
      required: [true, "Item can't be empty"],
    },
    previousStock: {
      type: Number,
      required: true,
    },
    modifiedBy: {
      type: Number,
      required: true,
    },
    newStock: {
      type: Number,
      required: true,
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

module.exports = mongoose.model("History", historySchema);
