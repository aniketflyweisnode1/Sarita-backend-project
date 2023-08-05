const mongoose = require("mongoose");
const packageSchema = new mongoose.Schema(
  {
    packageCategory: {
      type: String,
      required: true,
      enum: ["Package", "Document"],
    },
    length: {
      type: Number,
      // required:true
    },
    width: {
      type: Number,
      // required:true
    },
    height: {
      type: Number,
      // required:true
    },
    quantity: {
      type: Number,
      // required:true
    },
    weight: {
      type: Number,
      // required:true
    },
    shipmentValue: {
      type: Number,
      // required:true
    },
    currency: {
      type: String,
      // required:true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Package", packageSchema);
