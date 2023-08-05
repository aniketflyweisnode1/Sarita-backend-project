const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    length: {
      type: String,
    },
    weight: {
      type: String,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dimension", schema);
