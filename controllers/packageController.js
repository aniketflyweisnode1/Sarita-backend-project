const Package = require("../models/package.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createPackage = async (req, res) => {
  try {
    const packageObj = {
      packageCategory: req.body.packageCategory,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      weight: req.body.weight,
      quantity: req.body.quantity,
      shipmentValue: req.body.shipmentValue,
      currency: req.body.currency,
    };
    // const {length,weight,width,height,quantity,shipmentValue,currency} = req.body;

    const newPackage = await Package.create(packageObj);
    console.log(` ## new package details created ${newPackage} ##`);
    res.status(201).json({
      message: "new package details created ",
      data: newPackage,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    if (packages.length == 0) {
      return res.status(403).json({
        message: "no packages found",
      });
    }
    res.status(201).json({
      message: "packages found",
      data: packages,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};
exports.getPackagesById = async (req, res) => {
  try {
    const packages = await Package.findById(req.params.id);
    if (!packages || packages.length == 0) {
      return res.status(403).json({
        message: "no packages found",
      });
    }
    console.log(packages);

    return res.status(200).json({
      data: packages,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const packageObj = {
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      weight: req.body.weight,
      quantity: req.body.quantity,
      shipmentValue: req.body.shipmentValue,
      currency: req.body.currency,
    };
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      packageObj
    ).exec();
    console.log(` ## updated package details ${updatedPackage} ##`);
    res.status(200).json({
      message: "updated package details ",
      data: updatedPackage,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndRemove(req.params.id);
    console.log(` ## deleted package details ${deletedPackage} ##`);
    res.status(200).json({
      message: "deleted package details ",
      data: deletedPackage,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};
