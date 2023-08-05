const policy = require("../models/privacy_statement");
const ObjectId = require("mongoose").Types.ObjectId;

exports.addPrivacy = async (req, res) => {
  try {
    if (!req.body.privacy) {
      return res.status(400).json({
        result: "error",
        message: "privacy statement is required",
      });
    }
    const policyData = await policy.create({ privacy: req.body.privacy });
    res.status(200).json({
      data: policyData,
      message: " Policy Added ",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.getPrivacy = async (req, res) => {
  try {
    const data = await policy.find();
    if (!data || data.privacy == 0) {
      return res.status(400).send({ message: "not found" });
    }
    console.log(data[0].privacy);
    res.status(200).json({
      privacy: data[0],
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.updatePolicy = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    console.log(req.body.privacy);
    const UpdatedPolicy = await policy.findOneAndUpdate(
      { _id: req.params.id },
      {
        privacy: req.body.privacy,
      },
      { new: true }
    );
    if (!UpdatedPolicy) {
      return res.status(400).send({ message: "not found" });
    }
    console.log(UpdatedPolicy);
    res.status(200).json({
      message: " Updated policy",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
};

exports.DeletePolicy = async (req, res) => {
  try {
    const id = req.params.id;
    await policy.deleteOne({ _id: id });
    if (!policy) {
      return res.status(400).send({ message: "not found" });
    }
    res.status(200).send({ message: "Policy  deleted " });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};
