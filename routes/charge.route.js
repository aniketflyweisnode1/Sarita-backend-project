const chargeController = require("../controllers/charge_admin _controller");
const { objectId, authJwt, validateBodies } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/admin/charges",
    [authJwt.isAdmin, validateBodies.chargesBodies],
    chargeController.createCharge
  );
  app.put(
    "/api/v1/admin/charges/:id",
    [objectId.validId, authJwt.isAdmin],
    chargeController.updateCharge
  );
  app.delete(
    "/api/v1/admin/charges/:id",
    [objectId.validId, authJwt.isAdmin],
    chargeController.deleteCharge
  );
  app.get(
    "/api/v1/admin/charges ",
    [authJwt.isAdmin],
    chargeController.getAllCharges
  );
  app.get(
    "/api/v1/charges",
    //[authJwt.verifyToken],
    chargeController.getAllCharges
  );
  app.get(
    "/api/v1/charges/:id",
    [objectId.validId, authJwt.verifyToken],
    chargeController.getChargeById
  );
  app.get(
    "/api/v1/admin/charges/:id",
    [objectId.validId, authJwt.isAdmin],
    chargeController.getChargeById
  );
};
