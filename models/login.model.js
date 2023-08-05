const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
        },
        OTP: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("login", loginSchema);
