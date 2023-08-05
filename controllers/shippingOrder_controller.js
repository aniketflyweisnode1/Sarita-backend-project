const { request } = require("express");
const addressModel = require("../models/address.model");
const ShippingOrder = require("../models/ShippingOrder");
const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createShippingOrder = async (req, res) => {
    try {
        // const shippingToReq = await addressModel.findById(req.body.shippingTo);
        // const shippingFromReq = await addressModel.findById(req.body.shippingFrom);
        const user1 = await User.find({ userId: req.user._id });

        console.log(user1[0]._id.toString());
        const data = {
            userId: user1[0]._id.toString(),
            shippingFrom: req.body.shippingFrom,
            shippingTo: req.body.shippingTo,
            documents: req.body.documents,

            packages: req.body.packages,
            shipmentValues: req.body.shipmentValues,
            currency: req.body.currency,
        };
        console.log(data.packages);
        if (req.body.toMe) {
            const user2 = await User.find({ _id: req.body.toMe });
            data.toMe = user2[0]._id.toString();
        }

        const shippingOrder = await ShippingOrder.create(data);
        console.log(
            `## shipping order ${shippingOrder._id} created ##`,
            shippingOrder
        );

        console.log(user1[0].shippings);
        user1[0].shippings.push(shippingOrder._id);

        const updated = await user1[0].save();
        console.log(updated);

        res.status(201).json({
            message: "shipping order created",
            data: shippingOrder,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: err.message,
            message: "internal server error",
        });
    }
};

exports.updateShippingOrder = async (req, res) => {
    try {
        const id = req.params.id;

        const data = {};
        if (
            !req.body.parcelStatus == "Approved" ||
            !req.body.parcelStatus == "Pending"
        ) {
            return res
                .status(404)
                .send({ msg: "status should be Approved or Pending" });
        }
        data.parcelStatus = req.body.parcelStatus;
        const updateShippingTo = await ShippingOrder.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );
        console.log(`## shipping order updated ## \n ${updateShippingTo} `);
        res.status(200).json({
            message: "shipping order updated",
            data: updateShippingTo,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: err.message,
            message: "internal server error",
        });
    }
};

exports.deleteShippingOrder = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send({
                message: "  invalid id ",
            });
        }
        const id = req.params.id;
        const deleteShipping = await ShippingOrder.findByIdAndDelete(id);

        console.log(`## shipping order ${deleteShipping} deleted ##`);

        res.status(200).json({
            message: "shipping order deleted",
            data: deleteShipping,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: err.message,
            message: "internal server error",
        });
    }
};

exports.getShippingOrders = async (req, res) => {
    try {
        let queryObj = {};
        if (req.query.userId) {
            queryObj.userId = req.query.userId;
        }
        const ShippingOrders = await ShippingOrder.find(queryObj).populate(
            "packages"
        );
        if (ShippingOrders.length === 0) {
            return res.status(404).json({
                message: "shipping orders not found",
            });
        }
        res.status(200).json({
            message: "shipping orders found",
            data: ShippingOrders,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: err.message,
            message: "internal server error",
        });
    }
};
exports.getById = async (req, res) => {
    try {
        const result = await ShippingOrder.findOne({ _id: req.params.id });
        if (!result) {
            return res.status(404).json({ msg: "shipping order not found" });
        }
        res.status(200).json({ data: result });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "internal server error",
            error: err.message,
        });
    }
};

exports.getShippingOrderById = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send({
                message: "  invalid id ",
            });
        }
        const id = req.params.id;

        const ShippingOrders = await ShippingOrder.findById(id);
        if (ShippingOrders.length === 0) {
            return res.status(404).json({
                message: "shipping order not found",
            });
        }
        res.status(200).json({
            message: "shipping order found",
            data: ShippingOrders,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            err: err.message,
            message: "internal server error",
        });
    }
};

exports.getShippingOrdersByUser = async (req, res) => {
    try {
        console.log(req.params.userid);
        const user = await User.find({ userid: req.params.userid });
        if (user.length === 0) {
            return res.status(404).json({
                message: "user not found",
            });
        }

        const shippings = await ShippingOrder.find({
            _id: { $in: user[0].shippings },
        }).populate("packages");
        //   const shippings = await ShippingOrder.find({userId:req.params.userid});
        //   if(shippings.length === 0){
        //     return res.status(404).json({
        //       message: "shipping order not found",
        //     });

        // }
        res.status(200).json({
            message: "shipping order found",
            data: shippings,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: err.message,
            message: "internal server error",
        });
    }
};

//  shipping toMe controlller

exports.getShippingOrder = async (req, res) => {
    try {
        console.log(req.params.toMeId);

        const orders = await ShippingOrder.find({ toMe: req.params.toMeId });
        if (!orders) {
            return res.status(404).json({
                message: "shipping order not found",
            });
        }
        res.status(200).json({
            message: "shipping order found",
            data: orders,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: err.message,
            message: "internal server error",
        });
    }
};

exports.removePackage = async (req, res) => {
    try {
        const package = await ShippingOrder.findByIdAndUpdate(
            req.params.id,
            { $pull: { packages: { _id: "req.params.packageId" } } },
            { new: true }
        );

        if (!package)
            return res.status(404).send({ message: "package not found" });
        res.status(201).send({ message: "package removed", data: package });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "internal error", error: err.message });
    }
};
