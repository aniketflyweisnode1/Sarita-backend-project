const State = require("../models/state.model");
const Country = require("../models/country.model");
const City = require("../models/city.model");
const PinCode = require("../models/pincode.model");

exports.create = async (req, res) => {
  try {
    const data = {
      state: req.body.state,
      country: req.body.country,
      pinCode: req.body.pinCode,
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
      return res.status(404).send({ message: ` state is required ` });
    }
    const state = await State.findOne({ state: data.state });
    if (!state) {
      return res.status(404).send({ message: `${req.body.state} not found` });
    }

    if (!req.body.city) {
      return res.status(404).send({ message: `city is required` });
    }
    const city = await City.findOne({ city: data.city });
    if (!city) {
      return res.status(404).send({ message: `city not exists` });
    }

    if (!req.body.pinCode) {
      return res.status(404).send({ message: `pinCode is required` });
    }
    const pincode = await City.findOne({ pinCode: data.pinCode });

    if (pincode) {
      return res
        .status(404)
        .send({ message: `${req.body.pinCode} already exists ` });
    }

    const result = await PinCode.create(data);

    console.log(
      `#### ${result.pinCode} added to ${req.body.city} in ${result.state} ####`
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

exports.update = async (req, res) => {
  try {
    const data = {
      country: req.body.country,
      PinCode: req.body.pinCode,
    };
    if (req.body.city) {
      data.city = req.body.state;
    }
    if (req.body.state) {
      data.state = req.body.state;
    }
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
      const city = await City.findOne({ city: data.city });
      if (city) {
        return res
          .status(404)
          .send({ message: `${req.body.city} already exists` });
      }
    }

    const result = await PinCode.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    console.log(
      `#### ${result.pinCode} update in ${req.body.city} of state ${result.state} ####`
    );
    res.status(201).send({ msg: "pincode updated", data: result });
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
    res.status(201).send({ msg: "pincode deleted", data: result });
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
    if (req.query.city) {
      queryObj.city = new RegExp(req.query.city, 'i');
    }

    if (req.query.city) {
      queryObj.city = new RegExp(req.query.city, 'i');
    }

    const result = await PinCode.find(queryObj);
    if (!result || result.length === 0) {
      return res.status(404).send({ message: "pincodes not found" });
    }
    res.status(201).send({ data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await PinCode.findById(req.params.id);
    if (!result) {
      console.log(`pincode does not exist`);
      return res.status(404).send({ message: "pincode not found" });
    }
    console.log(result);
    res.status(201).send({ data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};
