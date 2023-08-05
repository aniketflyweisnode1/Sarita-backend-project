const mongoose = require("mongoose");

const offersSchema = mongoose.Schema({
  image: {
    type: String,
  },
});

const offers_Model = mongoose.model("offers", offersSchema);

module.exports = offers_Model;
