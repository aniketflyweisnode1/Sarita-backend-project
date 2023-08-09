const endUser = require("../models/endUseragreement.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.addEndUser = async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).json({
        result: "error",
        message: "endUser statement is required",
      });
    }
    const endUserData = await endUser.create({ message: req.body.message });
    res.status(200).json({
      data: endUserData,
      message: " EndUser agreement  Added ",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.getEndUser = async (req, res) => {
  try {
    const data = await endUser.find();
    console.log(data[0].endUser);
    res.status(200).json({
      endUser: data[0],
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.updateEndUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "dispute resolutin Id is invalid ",
      });
    }
    console.log(req.body.endUser);
    const UpdatedEndUser = await endUser
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          endUser: req.body.endUser,
        }
      )
      .exec();
    console.log(UpdatedEndUser);
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

exports.DeleteEndUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "dispute resolutin Id is invalid ",
      });
    }
    const id = req.params.id;
    await endUser.deleteOne({ _id: id });
    res.status(200).send({ message: "EndUser  deleted " });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.getEndUserById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "dispute resolutin Id is invalid ",
      });
    }
    const id = req.params.id;
    const data = await endUser.findById(id);
    if (!data) {
      return res.status(404).json({
        result: "not found",
        message: "endUser not found",
      });
    }
    console.log(data);
    res.status(200).json({
      endUser: data,
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: err.message, message: "internal server error" });
  }
};
