const validateUserRequestBodies = require("./validateUserRequestBodies");
const authJwt = require("./authJwt");
const paramsVerifier = require("./paramsVerifier");
const validateShipping = require("./validateShipping");
const discountCoupon = require("./discountActive");
const validateOrder = require("./validateOrder");
const validateBodies = require("./validateBodies");
const objectId = require("./object");
module.exports = {
  validateUserRequestBodies,
  authJwt,
  paramsVerifier,
  validateShipping,
  discountCoupon,
  validateOrder,
  validateBodies,
  objectId,
};
