const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "login",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      minLength: 10,
      lowercase: true,
      unique: true,
    },

    phone: {
      type: Number,
    },
    DOB: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    shippings: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "ShippingOrder",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
