const mongoose = require("mongoose");
const technicalSupportSchema = new mongoose.Schema(
  {
    gmailAddress: {
      type: String,
      minLength: 10,
      required: true,
      lowercase: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    timing: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TechnicalSupport", technicalSupportSchema);
