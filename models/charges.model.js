const mongoose = require("mongoose");

const chargeSchema = new mongoose.Schema(
  {
    pricePerUnitDistance: {
      type: Number,
    },
    pricePerVolumeUnits: {
      type: Number,
    },
    pricePerUnitWeight: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Charge", chargeSchema);
