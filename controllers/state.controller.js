const State = require("../models/state.model");
const Country = require("../models/country.model");

exports.create = async (req, res) => {
  try {
    const data = {
      state: req.body.state,
      country: req.body.country,
    };
    if (!req.body.country) {
      return res.status(404).send({ message: `country is required` });
    }
    const country = await Country.findOne({ country: data.country });
    if (!country) {
      return res
        .status(404)
        .send({ message: `${req.body.country} is not available` });
    }
    if (!req.body.state) {
      return res.status(404).send({ message: `state is required` });
    }
    const state = await State.findOne({ state: data.state });
    if (state) {
      return res
        .status(404)
        .send({ message: `${req.body.state} already exists` });
    }
    const result = await State.create(data);
    console.log(`#### ${result.state} added to ${req.body.country} ####`);
    res.status(201).send({ msg: "state added", data: result });
  } catch (err) {
    console.log(err.message);
    res.state(500).send({
      msg: "internal server error",
      error: err.message,
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const data = {
      state: req.body.state,
      country: req.body.country,
    };
    if (req.body.country) {
      const country = await Country.findOne({ country: data.country });
      if (!country) {
        return res
          .status(404)
          .send({ message: `${req.body.country} is not available` });
      }
    }
    if (!req.body.state) {
      return res.status(404).send({ message: `state is required` });
    }
    const state = await State.findOne({ state: data.state });
    if (state) {
      return res
        .status(404)
        .send({ message: `${req.body.state} is already exists` });
    }
    const result = await State.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    console.log(`#### ${result.state} update with ${req.body.country} ####`);
    res.status(201).send({ msg: "state updated", data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      msg: "internal server error",
      error: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await State.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "state does not exist" });
    }
    res.status(201).send({ msg: "state deleted", data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      msg: "internal server error",
      error: err.message,
    });
  }
};
exports.get = async (req, res) => {
  try {
    let queryObj = {};
    if (req.query.state) {
      queryObj.state = new RegExp(req.query.state, 'i');
    }

    const result = await State.find(queryObj);
    if (!result || result.length === 0) {
      return res.status(404).send({ message: "state does not exist" });
    }
    res.status(201).send({ data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await State.findById(req.params.id);
    if (!result) {
      console.log("state does not exist");
      return res.status(404).send({ message: "state does not exist" });
    }
    console.log(result);
    res.status(201).send({ data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};
