const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    country: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", schema);
