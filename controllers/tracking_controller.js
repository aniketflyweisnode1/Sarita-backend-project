const TrackingModel = require("../models/tacking");
const ObjectId = require("mongoose").Types.ObjectId;
const Booking = require("../models/booking.model");

exports.create = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).send({ msg: "order not found" });
    }
    if (!req.body.trackingId) {
      return res.status(404).send({ msg: "tracking Id not found" });
    }

    const data = {
      userId: booking.userId,
      bookingId: req.params.id,
      shippingOrderId: booking.shippingOrderId,
      trackingId: req.body.trackingId,
    };
    const trackingDetails = await TrackingModel.create(data);
    res.status(201).json({
      message: "got tracking details successfully",
      data: trackingDetails,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error occurred",
    });
  }
};

exports.get = async (req, res) => {
  try{
    const book = await
  }