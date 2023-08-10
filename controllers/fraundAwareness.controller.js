const FraudModel = require("../models/fraund_and_awareness.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.create = async (req, res) => {
  try {
    const data = {
      content: req.body.content,
    };
    const result = await FraudModel.create(data);
    res.status(201).json({
      message: "fraud awareness message added",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.getALl = async (req, res) => {
  try {
    const result = await FraudModel.find();
    if (result.length === 0) {
      res.status(200).json({
        message: "no fraud awareness message added",
      });
    }
    res.status(200).json({
      message: "fraud awareness message added",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.getById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    const result = await FraudModel.findById(req.params.id);

    if (!result) {
      res.status(200).json({
        message: "no fraud awareness message added",
      });
    }
    res.status(200).json({
      message: "fraud awareness message added",
      data: result,
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
        message: "  invalid id ",
      });
    }
    const result = await FraudModel.findById(req.params.id);
    if (!result) {
      return res.status(200).json({
        message: "no fraud awareness message added",
      });
    }
    result.content = req.body.content ? req.body.content : result.content;
    const updated = await result.save();

    res.status(200).json({
      message: "fraud awareness message updated",
      data: updated,
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
        message: "  invalid id ",
      });
    }
    const result = await FraudModel.findByIdAndDelete(req.params.id);
    console.log(` ## ${result._id} deleted ## `);
    res.status(200).json({
      message: "fraud awareness message deleted",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};
