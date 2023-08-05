const Package = require("../models/package.model");

const PackageBodies = async (req, res, next) => {
  try {
    if (!req.body.packageCategory) {
      return res.status(400).json({
        message: "please specify a package type",
      });
    }
    if (!req.body.length) {
      return res.status(400).json({
        message: "No! package length cannot be blank",
      });
    }
    if (!req.body.width) {
      return res.status(400).json({
        message: "No! package width cannot be blank",
      });
    }
    if (!req.body.height) {
      return res.status(400).json({
        message: "No! package height cannot be blank",
      });
    }
    if (!req.body.weight) {
      return res.status(400).json({
        message: "No package weight cannot be blank",
      });
    }
    if (!req.body.shipmentValue) {
      return res.status(400).json({
        message: "No package shipmentValue cannot be blank",
      });
    }
    if (!req.body.currency) {
      return res.status(400).json({
        message: "No package currency cannot be blank",
      });
    }
    next();
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      message: "internal server error",
    });
  }
};
const shippingBodies = async (req, res, next) => {
  try {
    if (!req.body.shippingTo) {
      return res.status(400).json({
        message: "shippingTo address is required",
      });
    } else {
      const shippingTo = req.body.shippingTo;
      if (!shippingTo.country) {
        return res.status(400).json({
          message: "shippingTo country is required",
        });
      }
      if (!shippingTo.state) {
        return res.status(400).json({
          message: "shippingTo state is required",
        });
      }
      if (!shippingTo.city) {
        return res.status(400).json({
          message: "shippingTo city is required",
        });
      }
      if (!shippingTo.pinCode) {
        return res.status(400).json({
          message: "shippingTo pinCode is required",
        });
      }
    }

    if (!req.body.shippingFrom) {
      return res.status(400).json({
        message: "shippingFrom address is required",
      });
    } else {
      const shippingFrom = req.body.shippingFrom;
      if (!shippingFrom.country) {
        return res.status(400).json({
          message: "shippingFrom country is required",
        });
      }
      if (!shippingFrom.state) {
        return res.status(400).json({
          message: "shippingFrom state is required",
        });
      }
      if (!shippingFrom.city) {
        return res.status(400).json({
          message: "shippingFrom city is required",
        });
      }
      if (!shippingFrom.pinCode) {
        return res.status(400).json({
          message: "shippingFrom pinCode is required",
        });
      }
    }

    if (!req.body.packages) {
      return res.status(400).json({
        message: "packages is required",
      });
    }
    next();
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      message: "internal server error",
    });
  }
};
const orderBody = async (req, res) => {
  if (!req.body.shippingId) {
    return res.status(400).json({
      message: "shippingId is required",
    });
  }
  if (!totalAmount) {
    return res.status(400).json({
      message: "totalAmount is required",
    });
  }
  if (!userId) {
    return res.status(400).json({
      message: "userId is required",
    });
  }
  next();
};
module.exports = {
  PackageBodies,
  orderBody,
  shippingBodies: shippingBodies,
};
