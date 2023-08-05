const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    shippingId: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Shipping",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingBookedTime: {
      type: Date,
      required: true,
      immutable: true,
    },
    status: {
      type: String,
      required: true,
      default: "IN_PROGRESS",
      enum: ["SUCCESS", "FAILED", "IN_PROGRESS", "CANCELED", "DELETED"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
