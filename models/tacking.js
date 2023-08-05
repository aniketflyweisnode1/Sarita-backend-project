const mongoose = require("mongoose");

const schema = new schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingOrder: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ShippingOrder",
    },
    bookingId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Booking",
    },
    trackingId: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TrackingOrder", schema);
