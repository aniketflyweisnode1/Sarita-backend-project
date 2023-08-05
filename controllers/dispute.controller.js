const Dispute = require("../models/dispute.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.addDisputed = async (req, res) => {
  try {
    const dispute = await Dispute.create({ message: req.body.message });
    res.status(200).json({
      data: dispute,
      message: "dispute Added ",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.getDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find();
    console.log(disputes);
    res.status(200).json({
      data: disputes,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.updateDispute = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "dispute resolutin Id is invalid ",
      });
    }
    console.log(req.body.dispute);
    const UpdatedDispute = await Dispute.findOneAndUpdate(
      { _id: req.params.id },
      {
        dispute: req.body.dispute,
      }
    ).exec();
    console.log(UpdatedDispute);
    res.status(200).json({
      message: "dispute Resolution Updated",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
};

exports.deleteDispute = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({
      message: "Id is not valid Obj Id",
    });
  }
  try {
    const id = req.params.id;
    await Dispute.deleteOne({ _id: id });
    res.status(200).send({ message: "Dispute resolution deleted " });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.getDisputesById = async (req, res) => {
  try {
   if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "dispute resolutin Id is invalid ",
      });
    } 
    const disputes = await Dispute.findById(req.params.id);
    console.log(disputes);
    res.status(200).json({
      data: disputes,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({
      message: err.message,
    });
  }
};
