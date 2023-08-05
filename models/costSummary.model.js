const mongoose = require("mongoose");

const costSchema = new mongoose.Schema(
  {
    shippingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingOrder",
    },

    totalAmount: {
      type: Number,
      required: true,
    },
    
    // fuelSurcharge: {
    //   type: Number,
    //   required: true,
    // },
    // VAT: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Shipping", costSchema);
