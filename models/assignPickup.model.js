const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    shippingOrderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ShippingOrder",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PickupMen", schema);
