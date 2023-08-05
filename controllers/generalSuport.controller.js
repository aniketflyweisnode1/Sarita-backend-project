const generalSupport = require("../models/generalShippingSupport");
const ObjectId = require("mongoose").Types.ObjectId;

exports.create = async (req, res) => {
  try {
    const data = {
      gmailAddress: req.body.gmailAddress,
      phoneNumber: req.body.phoneNumber,
      timing: req.body.timing,
      days: req.body.days,
      message: req.body.message,
    };
    const result = await generalSupport.create(data);
    res.status(201).json({
      message: "suppport created successfuly",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
      message: "internal server error",
    });
  }
};

exports.getAllSupports = async (req, res) => {
  try {
    const result = await generalSupport.find();
    res.status(200).json({
      message: " got all supports successfully",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
      message: "internal server error",
    });
  }
};

exports.getOneSupports = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    const result = await generalSupport.findById(req.params.id);
    res.status(200).json({
      message: " got one supports successfully",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
      message: "internal server error",
    });
  }
};
