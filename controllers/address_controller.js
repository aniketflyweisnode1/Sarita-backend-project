const Address = require("../models/address.model");

exports.createAddress = async (req, res) => {
  try {
    const { country, state, city, pinCode } = req.body;
    const address = await Address.create({ country, state, city, pinCode });
    console.log(address);
    res.status(201).json({ message: "address created", data: address });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const address = await Address.find();
    if (address.length === 0) {
      return res.status(404).json({ message: "no address found" });
    }
    res.status(200).json({
      message: "address found",
      data: address,
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { country, state, city, pinCode } = req.body;
    const user = await Address.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, {
      country,
      state,
      city,
      pinCode,
    });
    console.log(updatedAddress);
    res.status(200).json({ message: "address updated", data: updatedAddress });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};

exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "address not found" });
    }
    res.status(200).json({
      message: "address found",
      data: address,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
};
