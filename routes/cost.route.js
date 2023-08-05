const costController = require("../controllers/cost_summary");
const { objectId, authJwt } = require("../middlewares");
module.exports = (app) => {
    app.post(
        "/api/v1/shippings/:id/charges/:chargesId/costsummary",
        [authJwt.verifyToken, objectId.validId],
        costController.createCostSummary
    );
    app.get(
        "/api/v1/costsummary/:id",
        [authJwt.verifyToken, objectId.validId],
        costController.getCostSummaryByshippingId
    );
    app.delete(
        "/api/v1/costsummary/:id",
        [authJwt.verifyToken, objectId.validId],

        costController.delete
    );
    app.get(
        "/api/v1/shipping/costsummary/shippingId",
        costController.getCostSummaryByChargeId
    );
};
