const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    shippingOrderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ShippingOrder",
    },
    coupon: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "coupen",
    },
    discountAmount: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    orderApproved: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", schema);
