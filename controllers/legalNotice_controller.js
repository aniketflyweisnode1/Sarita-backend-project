const legal = require("../models/legalNotice.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.addLegal = async (req, res) => {
  try {
    if (!req.body.content) {
      return res.status(400).json({
        result: "error",
        message: "legal statement is required",
      });
    }
    const legalData = await legal.create({ content: req.body.content });
    res.status(200).json({
      data: legalData,
      message: " Legal Added ",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.getLegal = async (req, res) => {
  try {
    const data = await legal.find();
    console.log(data[0].legal);
    res.status(200).json({
      legal: data[0],
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.updateLegal = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    console.log(req.body.legal);
    const UpdatedLegal = await legal
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          legal: req.body.legal,
        }
      )
      .exec();
    console.log(UpdatedLegal);
    res.status(200).json({
      message: "Contact Update",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
};

exports.DeleteLegal = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    const id = req.params.id;
    await legal.deleteOne({ _id: id });
    res.status(200).send({ message: "Legal  deleted " });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};
exports.getLegalById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    const id = req.params.id;
    const data = await legal.findById(id);
    if (!data) {
      return res.status(404).json({
        result: "not found",
        message: "legal not found",
      });
    }
    console.log(data);
    res.status(200).json({
      legal: data,
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: err.message, message: "internal server error" });
  }
};
