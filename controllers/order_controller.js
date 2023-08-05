const OrderModel = require("../models/order.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createOrder = async (req, res) => {
  try {
    const orderObj = {
      userId: req.body.userId,
      shippingId: req.body.shippingId,
      totalAmount: req.body.totalAmount,
      shippingBookedTime: Date.now(),
    };
    const newOrder = await OrderModel.create(orderObj);
    res.status(201).json({
      message: "order created successfully !!",
      data: newOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "Something went wrong",
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      res.status(200).json({
        message: "No orders found",
      });
    }
    res.status(200).json({ data: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "Something went wrong",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).json({
        message: "Order not found",
      });
    }
    res.status(200).json({
      message: "Order deleted",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "Something went wrong",
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    const { totalAmount, shippingId } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { totalAmount, shippingId },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({
        message: "Order not updated",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "Something went wrong",
    });
  }
};

exports.getOrdersById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    const orders = await Order.findById(req.params.id);
    if (!orders) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    res.status(200).json({ data: orders });
    console.log(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "Something went wrong",
    });
  }
};
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    if (orders.length === 0) {
      res.status(403).json({
        message: "No orders found",
      });
    }
    res.status(201).json({
      data: orders,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "Something went wrong",
    });
  }
};
