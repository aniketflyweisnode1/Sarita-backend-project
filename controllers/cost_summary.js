const CostSummary = require("../models/costSummary.model");
const ChargeModel = require("../models/charges.model");
const ShippingOrder = require("../models/shippingOrder");

exports.createCostSummary = async (req, res) => {
    try {
        const charge = await ChargeModel.findById(req.params.chargesId);
        if (!charge) {
            return res.status(404).send({ msg: "Charge not found" });
        }
        const shipping = await ShippingOrder.findById(req.params.id);

        let totalWeight = 0;
        shipping.packages.forEach((package) => {
            totalWeight += package.weight * package.quantity;
        });
        console.log(totalWeight);
        const costObject = {
            //distance:req.body.distance,
            //userId: req.user._id,
            chargeId: req.params.chargeId,
            shippingId: req.params.id,
            totalAmount: totalWeight * charge.pricePerUnitWeight,
        };
        //transportationCharges: charge.pricePerKm * req.body.distance,
        // fuelSurcharge: charge.fuelSurcharge * req.body.distance,
        // VAT: req.body.VAT,

        const cost = await CostSummary.create(costObject);
        res.status(201).json({
            message: "cost summary created",
            data: cost,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
            message: "Server Error",
        });
    }
};

exports.getCostSummaryByshippingId = async (req, res) => {
    try {
        const cost = await CostSummary.findById(req.params.id);
        res.status(200).json({
            message: "cost summary found",
            data: cost,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
            message: "Server Error",
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await CostSummary.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "cost summary deleted",
            data: deleted,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
            message: "Server Error",
        });
    }
};

exports.getCostSummaryByChargeId = async (req, res) => {
    try {
        const cost = await CostSummary.findById(req.params.id);
        res.status(200).json({
            message: "cost summary found",
            data: cost,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
            message: "Server Error",
        });
    }
};
