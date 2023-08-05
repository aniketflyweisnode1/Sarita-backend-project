const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  pickupMan: {
    type: String,
  },
  shippingOrderId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "ShippingOrder",
  },
});

module.exports = mongoose.model("Schedule", schema);
