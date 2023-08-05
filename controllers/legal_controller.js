const legalModel = require("../models/legal.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.create = async (req, res) => {
  try {
    const data = {
      accessibility: req.body.accessibility,
    };
    const legal = await legalModel.create(data);
    return res.status(201).json({
      message: "accessibility",
      data: legal,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "internal server error",
    });
  }
};

exports.update = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    const legal = await legalModel.findByIdAndUpdate(req.params.id, {
      accessibility: req.body.accessibility,
    });

    res.status(200).json({
      message: "success",
      data: legal,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "internal server error",
    });
  }
};
exports.get = async (req, res) => {
  try {
    const results = await legalModel.find();
    if (results.length === 0) {
      return res.status(404).send({ message: "not found" });
    }
    res.status(200).json({ data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const results = await legalModel.findById(req.params.id);
    if (results.length === 0) {
      return res.status(404).send({ message: "not found" });
    }
    res.status(200).json({ data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};
