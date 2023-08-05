const ChargeModel = require("../models/charges.model");
exports.createCharge = async (req, res) => {
  try {
    const chargeObj = {
      pricePerUnitDistance: req.body.pricePerUnitDistance,
      pricePerUnitWeight: req.body.pricePerUnitWeight,
      pricePerVolumeUnits: req.body.pricePerVolumeUnits,
    };
    const charges = await ChargeModel.create(chargeObj);
    console.log(`Charges added ${charges}`);
    res.status(201).json({
      message: "charges added successfully",
      data: charges,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "error in creating charge",
    });
  }
};

exports.getAllCharges = async (req, res) => {
  try {
    const charges = await ChargeModel.find();
    if (charges.length === 0) {
      console.log(" ## not found ##");
      return res.status(404).send({ message: "not found" });
    }
    res.status(200).json({
      message: "charges retrieved successfully",
      data: charges,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "error in retrieving charges",
    });
  }
};

exports.getChargeById = async (req, res) => {
  try {
    const charges = await ChargeModel.findById(req.params.id);
    if (!charges) {
      console.log(" ## not found ##");
      return res.status(404).send({ message: "not found" });
    }
    console.log(charges);
    res.status(200).json({
      message: "charges retrieved successfully",
      data: charges,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "error in retrieving charges",
    });
  }
};

exports.updateCharge = async (req, res) => {
  try {
    const charges = await ChargeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!charges) {
      console.log(" ## not found ##");
      return res.status(404).send({ message: "not found" });
    }

    console.log("#### charges updated ####\n" + charges);
    res.status(200).json({
      message: "charges updated successfully",
      data: charges,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "error in updating charges",
    });
  }
};

exports.deleteCharge = async (req, res) => {
  try {
    const charges = await ChargeModel.findByIdAndDelete(req.params.id);
    if (!charges) {
      console.log("## not found ##");
      return res.status(404).send({ message: "not found" });
    }
    console.log("#### charges deleted ####\n" + charges);
    res.status(200).json({
      message: "charges deleted successfully",
      data: charges,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "error in deleting charges",
    });
  }
};
