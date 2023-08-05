const Dimension = require("../models/dimension.model.js");

exports.create = async (req, res) => {
  try {
    if (!req.body.length) {
      return res.status(400).send({ message: "length is required" });
    }
    if (!req.body.weight) {
      return res.status(400).send({ message: "weight is required" });
    }
    if (!req.body.height) {
      return res.status(400).send({ message: "height is required" });
    }
    if (!req.body.width) {
      return res.status(400).send({ message: "width is required" });
    }

    const data = {
      length: req.body.length,
      width: req.body.width,
      weight: req.body.weight,
      height: req.body.height,
    };
    const result = await Dimension.create(data);
    res.status(201).send({ msg: "added dimensions", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Dimension.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!result) {
      return res.status(404).send({ msg: "not found" });
    }
    res.status(201).send({ msg: "updated dimensions", data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Dimension.find();
    if (result.length === 0) {
      console.log("#### no  found ####");
      return res.status(404).send({ msg: "not found" });
    }
    console.log(`#### found total dimension types: ${result.length}`);
    res.status(201).send({ data: result });
  } catch (err) {
    console.log(err.message);
    res.state(500).send({ msg: "internal server error", error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await Dimension.findById(req.params.id);
    if (!result || result.length === 0) {
      console.log("#### no  found ####");
      return res.status(404).send({ msg: "not found" });
    }
    console.log(`#### found  dimension types #### ` + "\n" + `${result}`);
    res.status(201).send({ data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Dimension.findByIdAndDelete(req.params.id);
    if (!result) {
      console.log("#### not found ####");
      return res.status(404).send({ msg: "not found" });
    }
    console.log(`#### deleted  dimension` + result);
    res.status(201).send({ msg: "deleted ", data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};
