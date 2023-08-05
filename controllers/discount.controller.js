const DiscountModel = require("../models/discount.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.create = async (req, res) => {
  try {
    const data = {
      coupenCode: req.body.coupenCode,
      maxDiscountAmount: req.body.maxDiscountAmount,
      minAmount: req.body.minAmount,
      activationDate: req.body.activationDate,
      expiryDate: req.body.expiryDate,
      discountPercent: req.body.discountPercent,
      expireAt: req.body.expiryDate,
    };
    const discount = await DiscountModel.create(data);
    res.status(201).json({
      message: "coupon created",
      data: discount,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.getDiscounts = async (req, res) => {
  try {
    let queryObj = {};
    if (req.query.coupenCode) {
      queryObj.coupenCode = req.query.coupenCode;
    }
    if (req.query.isActive) {
      queryObj.isActive = req.query.isActive;
    }
    if (req.query.discountPercent) {
      queryObj.discountPercent = req.query.discountPercent;
    }

    const discounts = await DiscountModel.find(queryObj);
    if (discounts.length === 0) {
      return res.status(200).json({
        message: "no discounts",
      });
    }
    res.status(200).json({
      message: "discounts fetched",
      data: discounts,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};
exports.update = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "coupon Id is not valid Id",
      });
    }
    const data = {
      coupenCode: req.body.coupenCode,
      maxDiscountAmount: req.body.maxDiscountAmount,
      minAmount: req.body.minAmount,
      activationDate: req.body.activationDate,
      expiryDate: req.body.expiryDate,
      discountPercent: req.body.discountPercent,
      expireAt: req.body.expiryDate,
    };
    const discount = await DiscountModel.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    if (!discount) {
      console.log(" #### discount coupon not found ####");
      return res.status(404).send({ message: "coupon not found" });
    }
    console.log(" #### discount coupon updated ####\n" + discount);

    console.log(`  ${discount}  `);
    res.status(200).json({
      message: "coupon updated",
      data: discount,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.getDiscountById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "coupon Id is  Invalid ",
      });
    }
    const discount = await DiscountModel.findById(req.params.id);
    if (!discount) {
      return res.status(200).json({
        message: "no discount coupon found",
      });
    }
    res.status(200).json({
      message: " discount fetched ",
      data: discount,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "coupon Id is not valid Obj Id",
      });
    }
    const discount = await DiscountModel.findById(req.params.id);
    if (!discount) {
      return res.status(200).json({
        message: "no discount coupen found",
      });
    }
    const removed = await discount.remove();
    res.status(200).json({
      message: "discount deleted",
      data: removed,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};
