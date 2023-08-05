const Pickup = require("../models/assignPickup.model");
//const Shippings = require("../models/shippingOrder");
exports.create = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ msg: "name is required" });
    }
    const shipping = await Shipping.findById(req.params.id);
    if (!shipping) {
      return res.status(400).send({ msg: "shipping order not found" });
    }
    const dataObj = {
      name: req.body.name,
      shippingOrderId: req.params.id,
    };
    const pickupMen = await Pickup.create(dataObj);
    // const shippin = await Shippings.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     pickupMan: pickupMen.pickupMan,
    //   },
    //   {
    //     new: true,
    //   }
    // );

    // shipping.pickupMan = pickupMen.pickupMan;
    // await shipping.save();

    res.status(200).json({ msg: "created", data: pickupMen });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "internal server error" });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ msg: "name is required" });
    }
    const result = await Pickup.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!result) {
      return res.status(400).send({ msg: "not found assigned pickup order " });
    }
    res.status(200).json({ message: "updated", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "internal server error", error: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Pickup.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).send({ msg: "not found assigned pickup order " });
    }
    res.status(200).json({ message: "deleted successfully", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "internal server error" });
  }
};
exports.get = async (req, res) => {
  try {
    const queryObj = {};
    if (req.query.name) {
      queryObj.name = req.query.name;
    }
    const result = await Pickup.find(queryObj).populate("shippingOrderId");
    if (result.length === 0) {
      return res
        .status(404)
        .send({ msg: "not found assigned shipping order to pickup men" });
    }
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "internal server error", error: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await Pickup.findById(req.params.id);
    if (!result || result.length === 0) {
      return res
        .status(404)
        .send({ msg: "not found assigned shipping order to pickup men" });
    }
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "internal server error", error: err });
  }
};
