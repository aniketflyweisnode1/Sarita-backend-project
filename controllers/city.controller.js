const State = require("../models/state.model");
const Country = require("../models/country.model");
const City = require("../models/city.model");
exports.create = async (req, res) => {
  try {
    const data = {
      state: req.body.state,
      country: req.body.country,
      city: req.body.city,
    };
    console.log(data);
    if (!req.body.country) {
      return res.status(404).send({ message: `country is required` });
    }
    const country = await Country.findOne({ country: req.body.country });
    if (!country) {
      return res
        .status(404)
        .send({ message: `${req.body.country} is not available` });
    }
    if (!req.body.state) {
      return res.status(404).send({ message: `state is required` });
    }
    const state = await State.findOne({ state: data.state });
    if (!state) {
      return res.status(404).send({ message: `${req.body.state} not found` });
    }

    if (!req.body.city) {
      return res.status(404).send({ message: `city is required` });
    }
    const city = await City.findOne({ city: data.city });
    if (city) {
      return res
        .status(404)
        .send({ message: `${req.body.city} already exists` });
    }

    const result = await City.create(data);
    console.log(
      `#### ${result.city} added to ${req.body.state} in ${result.country} ####`
    );
    res.status(201).send({ msg: "city added", data: result });
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
      country: req.body.country,
      city: req.body.city,
    };
    if (req.body.country) {
      const country = await Country.findOne({ country: data.country });
      if (!country) {
        return res
          .status(404)
          .send({ message: `${req.body.country} is not available` });
      }
    }
    if (req.body.state) {
      const state = await State.findOne({ state: data.state });
      if (state) {
        return res
          .status(404)
          .send({ message: `${req.body.state} is already exists` });
      }
    }
    if (!req.body.city) {
      return res.status(404).send({ message: `city is required` });
    }
    const city = await City.findOne({ city: data.city });
    if (city) {
      return res
        .status(404)
        .send({ message: `${req.body.city} already exists` });
    }
    const result = await City.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    console.log(
      `#### ${result.city} updated to ${req.body.state} in ${req.body.country} ####`
    );
    res.status(201).send({ msg: "city updated", data: result });
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
      queryObj.state = req.query.state;
    }
    if (req.query.city) {
      queryObj.city = new RegExp(req.query.city, 'i');
    }

    const result = await City.find(queryObj);
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
    const result = await City.findById(req.params.id);
    if (!result) {
      console.log(`city does not exist`);
      return res.status(404).send({ message: "city does not exist" });
    }
    console.log(result);
    res.status(201).send({ data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};
