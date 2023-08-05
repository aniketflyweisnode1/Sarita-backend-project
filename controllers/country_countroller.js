const Country = require("../models/country.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.addCountry = async (req, res) => {
  try {
    if (!req.body.country) {
      return res.status(400).json({
        error: "Country is required"
      });
    }
    if (!req.body.code) {
      return res.status(400).json({
        error: "Code is required",
        message: "Please enter country code"
      });
    }
    const country = await Country.create({
      country: req.body.country,
      code: req.body.code,
    });
    console.log(`## ${country} added ## `);
    res.status(201).json({
      message: " country added successfully! ",
      data: country,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message,
      message: "internal server error",
    });
  }
};

exports.getCountryByName = async (req, res) => {
  try {
    const country = await Country.findOne({
      country: req.params.countryName,
    });
    res.status(200).json({
      message: " country found ! ",
      data: country,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
      message: "internal server error",
    });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "country Id is not valid ",
      });
    }
    const country = await Country.findById(req.params.id);

    country.country = req.body.country ? req.body.country : country.country;
    country.code = req.body.code ? req.body.code : country.code;

    const updated = await country.save();
    res.status(200).json({
      message: " country updated successfully! ",
      data: updated,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
      message: "internal server error",
    });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "country Id is not valid ",
      });
    }
    const country = await Country.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: " country deleted successfully! ",
      data: country,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
      message: "internal server error",
    });
  }
};

exports.getAllCountries = async (req, res) => {
  try {
    let queryObj = {};
    if (req.query.country) {
      queryObj.country = new RegExp(req.query.country, 'i');
    }
    const count = await Country.find(queryObj).lean().select({ _id: 1, country: 1, code: 1 });
    if (!count || count.length === 0) {
      return res.status(404).json({
        message: "no country found!",
      });
    }
    res.status(200).json({
      message: " countries found! ",
      data: count,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
      message: "internal server error",
    });
  }
};

exports.getCountryById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "country Id is not valid ",
      });
    }
    console.log(req.params.id);
    const country = await Country.findById(req.params.id);
    console.log(country, " ", req.params.id);
    if (!country) {
      return res.status(404).json({
        message: "country not found!",
      });
    }
    res.status(200).json({
      message: " country found! ",
      data: country,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
      message: "internal server error",
    });
  }
};

