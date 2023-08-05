const legalController = require("../controllers/legal_controller");
const { authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/legal/accessibility",
    [authJwt.isAdmin],
    legalController.create
  );
  app.put(
    "/api/v1/legal/accessibility",
    [authJwt.isAdmin],
    legalController.update
  );
  app.get("/api/v1/legal/accessibility", legalController.get);
  app.get(
    "/api/v1/legal/accessibility/:id",
    [objectId.validId],
    legalController.getById
  );
};
