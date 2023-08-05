const Schedule = require("../models/pickupSchedule.model");

exports.create = async (req, res) => {
  try {
    if (!req.body.pickupMan) {
      return res.status(400).send({ message: "pickup man's name is required" });
    }
    if (!req.body.time) {
      return res.status(400).send({ message: " pickup time is required" });
    }
    if (!req.body.date) {
      return res.status(400).send({ message: "pickup date is required" });
    }
    const dataObj = {
      pickupMan: req.body.pickupMan,
      time: req.body.time,
      date: req.body.date,
      shippingOrderId: req.params.id,
    };
    const result = await Schedule.create(dataObj);
    res.status(201).send({ message: "pickup schedule created", data: result });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "internal error while creating pickup schedule",
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const dataObj = {
      pickupMan: req.body.pickupMan,
      time: req.body.time,
      date: req.body.date,
      // shippingOrderId: req.params.id,
    };
    const result = await Schedule.findByIdAndUpdate(req.params.id, dataObj, {
      new: true,
    });

    if (!result) {
      return res.status(400).send({ message: " not found schedule of order" });
    }

    res.status(201).send({ message: "pickup schedule updated", data: result });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "internal error while updating pickup schedule" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Schedule.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).send({ message: "not found schedule of order" });
    }
    res.status(201).send({ message: "deleted", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal error while deleting" });
  }
};

exports.get = async (req, res) => {
  try {
    let queryObj = {};
    if (req.query.date) {
      queryObj.date = req.query.date;
    }
    const result = await Schedule.find(queryObj).populate("shippingOrderId");
    if (!result || result.length === 0) {
      return res.status(404).send({ message: "not found schedule" });
    }
    res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal error ", error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await Schedule.findById(req.params.id);
    if (!result || result.length === 0) {
      return res.status(404).send({ message: "not found schedule" });
    }
    res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal error ", error: err.message });
  }
};
