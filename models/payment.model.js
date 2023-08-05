const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    bookingId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Booking",
    },
    paymentStatus: {
      type: String,
      enum: ["success", "pending", "failed"],
    },
    amount: {
      type: Number,
    },
    orderId: {
      type: String,
    },
    receipt: {
      type: String,
    },
    status: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Payment", schema);
