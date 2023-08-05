const Discount = require("../models/discount.model");

const couponBodies = async(req,res,next) => {
    if (!req.body.minAmount ) {
        return res.status(400).json({
          message: "not reached minimum amount threshold",
        });
      }
    if(!req.body.coupenCode){
        return res.status(400).json({
          message: "missing coupon code",
        });
    }
    if(!req.body.maxDiscountAmount){
        return res.status(400).json({
          message: "not reached maximum discount amount threshold",
        });
    }
    if(!req.body.activationDate){
        return res.status(400).json({
          message: " activation date not provided",
        });
    } 
    if(!req.body.expiryDate){
        return res.status(400).json({
          message: " expiry date not provided",
        });
    }
    if(!req.body.discountPercent){
        return res.status(400).json({
          message: " discount percent not provided",
        });
    }
    next();
}






const isCouponValid = async (req, res, next) => {
  const ObjectId = require("mongoose").Types.ObjectId;
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({
      message: "coupon Id is not valid Obj Id",
    });
  }
  try {
    let coupon = await Discount.findById(req.params.id);
    if (coupon.coupenCode !== req.body.coupenCode) {
      return res.status(400).json({
        message: "Coupon code is not valid",
      });
    }
    if (minAmount !== coupon.minAmount) {
      return res.status(400).json({
        message: "not reached minimum amount threshold",
      });
    }
    if (!coupon.isActive) {
      return res.status(400).json({
        message: "Coupon is not active",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      message: err,
      data: "internal server error",
    });
  }
};
module.exports = {
  isCouponValid: isCouponValid,
  couponBodies: couponBodies,
};
