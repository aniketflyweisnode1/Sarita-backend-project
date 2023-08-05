const ObjectId = require("mongoose").Types.ObjectId;
const { application } = require("express");
const Items = require("../models/bannedAndRestricted.model");

exports.create = async (req, res) => {
  try {
    const data = {
      restrictedItems: req.body.restrictedItems,
      bannedItems: req.body.bannedItems,
    };
    const items = await Items.create(data);
    res.status(201).json({
      message: "itemsList created successfully ",
      data: items,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.updateAdd = async (req, res) => {
  try {
    const data = {
      restrictedItems: req.body.restrictedItems,
      //   removeBannedItems: req.body.removeBannedItems,
      //   addRestrictedItems: req.body.addRestrictedItems,
      bannedItems: req.body.bannedItems,
    };
    const items = await Items.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { bannedItems: data.bannedItems },
        $addToSet: { restrictedItems: data.restrictedItems },
      },
      { new: true }
    );
    res.status(201).json({
      message: "itemsList updated successfully ",
      data: items,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.updateRemove = async (req, res) => {
  try {
    const data = {
      restrictedItems: req.body.restrictedItems,
      //   removeBannedItems: req.body.removeBannedItems,
      //   addRestrictedItems: req.body.addRestrictedItems,
      bannedItems: req.body.bannedItems,
    };
    const items = await Items.findOneAndUpdate(
      { _id: req.params.id },

      {
        $pull: {
          bannedItems: { $in: data.bannedItems },
          restrictedItems: { $in: data.restrictedItems },
        },
      },
      { new: true }
    );
    res.status(201).json({
      message: "itemsList updated successfully ",
      data: items,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const items = await Items.find();
    if (items.length === 0) {
      return res.status(404).json({ message: " not found" });
    }
    res.status(200).send({ data: items });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const items = await Items.findById(req.params.id);
    if (!items || items.length === 0) {
      return res.status(404).json({ message: " not found" });
    }
    res.status(200).send({ data: items });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const items = await Items.findByIdAndUpdate({ id: req.params.id });
    if (!items) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(201).send({ msg: "deleted", data: items });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
};
