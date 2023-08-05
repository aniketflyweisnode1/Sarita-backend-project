const Booking = require("../models/booking.model");
const ShippingOrder = require("../models/shippingOrder");
const Items = require("../models/bannedAndRestricted.model");
const Coupon = require("../models/discount.model");
const CostSummary = require("../models/costSummary.model");

exports.create = async (req, res) => {
  try {
    const amount = await CostSummary.findOne({
      shippingId: req.params.id,
    });
    if (!amount) {
      return res.status(404).send({ message: " amount not found" });
    }
    const coupon = await Coupon.findOne({
      coupenCode: req.body.couponCode,
    });
    const shipping = await ShippingOrder.findOne({ _id: req.params.id });
    if (!coupon) {
      return res.status(404).send({ message: "coupon not found" });
    }

    console.log(shipping);
    const discountAmount =
      coupon.maxDiscountAmount >
      Math.floor((amount.totalAmount * coupon.discountPercent) / 100)
        ? Math.floor((amount.totalAmount * coupon.discountPercent) / 100)
        : coupon.maxDiscountAmount;
    console.log(discountAmount);

    const bookingObj = {
      userId: shipping.userId,
      shippingOrderId: amount.shippingId,
      amount: amount.totalAmount,
      coupon: coupon._id,
      discountAmount: discountAmount,
      totalAmount: amount.totalAmount - discountAmount,
    };
    console.log(bookingObj);
    // if (coupon.minActiveAmount < amount.totalAmount) {
    //     bookingObj.totalAmount = amount.totalAmount - discountAmount;
    // } else {
    //     bookingObj.totalAmount = amount.totalAmount;
    //     return res
    //         .status(403)
    //         .send({
    //             message: "minActiveAmount is required for this coupon",
    //         });
    // }
    const booking = await Booking.create(bookingObj);
    res.status(201).send({ msg: "booking initiated", data: booking });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: "internal error ",
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    let qObj = {};
    if (req.query.userId) {
      qObj.userId = req.query.userId;
    }
    if (req.query.shippingOrderId) {
      qObj.shippingOrderId = req.query.shippingOrderId;
    }
    const booking = await Booking.find(qObj).populate("userId");
    if (booking.length === 0) {
      return res.status(404).send({ message: " not found" });
    }
    res.status(201).send({ data: booking });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: "internal server error",
      error: err.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await Booking.findById(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "not found" });
    }
    res.status(201).send({ data: result });
  } catch (err) {
    console.log(err.message);
    s;
    res.status(500).send({
      message: "internal server error",
      error: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: "not found" });
    }
    res.status(201).send({ data: booking });
  } catch (err) {
    console.log(err.message);
    res.status(201).send({
      message: "internal server error",
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body.orderApproved) {
      return res
        .status(403)
        .send({ message: "order approve permission is required" });
    }
    if (
      !req.body.orderApproved == "Approved" ||
      !req.body.orderApproved == "Pending" ||
      !req.body.orderApproved == "Rejected"
    ) {
      return res.status(403).send({
        msg: "order approve permission must be either of Approved, Pending, or Rejected",
      });
    }
    const book = await Booking.findByIdAndUpdate(
      req.params.id,
      { orderApproved: req.body.orderApproved },
      { new: true }
    );
    if (!book) return res.status(404).send({ msg: "update failed" });
    res.status(201).send({ msg: "updated booking order", data: book });
  } catch (err) {
    console.log(err.message);
    res.status(201).send({ msg: "internal server error", error: err.message });
  }
};

// exports.legalPackageItems = async (req, res) => {
//   const orders = await shipping.findById(req.params.id);
//   if (!orders) return res.status(403).send({ msg: "order not found" });
//     const items = await Items.find();
//     if(items.length === 0) return res.status(404).send({ msg: "items not found" });

//     let legalOrder = orders.packages.forEach(order => {
//         if()

//     });

// };

exports.getDailyBooking = async (req, res) => {
  try {
    console.log(new Date(req.body.startDate), " ", new Date(req.body.endDate));
    const data = {};
    if (req.query.startDate) {
      data.startDate = new Date(req.query.startDate);
    } else {
      Date.now();
    }
    if (req.query.endDate) {
      data.endDate = new Date(req.query.endDate);
    } else {
      Date.now();
    }
    console.log(data);
    const booking = await Booking.find({
      createdAt: {
        $gte: data.startDate,
        $lt: data.endDate,
      },
    }).populate(["shippingOrderId", "userId"]);
    console.log(booking.length);
    if (!booking) return res.status(404).send({ msg: "not found any data" });
    res.status(200).send({ count: booking.length, data: booking });
  } catch (err) {
    console.log(err.message);
    res.status(404).send({ msg: "internal server error" });
  }
};
