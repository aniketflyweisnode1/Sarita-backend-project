const mongoose = require("mongoose");

const coupenSchema = mongoose.Schema(
  {
    coupenCode: {
      type: String,
      required: true,
    },
    minAmount: {
      type: Number,
      required: true,
    },
    maxDiscountAmount: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
    activationDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      require: true,
      default: false,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    expireAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupen", coupenSchema);
