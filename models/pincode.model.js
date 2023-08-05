const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Zip", schema);
