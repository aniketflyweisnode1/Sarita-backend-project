const privacy = require("../controllers/privacy_controlller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/api/v1/admin/legal/privacy",
    [authJwt.isAdmin],
    privacy.addPrivacy
  );
  app.get("/api/v1/admin/legal/privacy", privacy.getPrivacy);
  app.get("/api/v1/legal/privacy", privacy.getPrivacy);
  app.put(
    "/api/v1/admin/legal/privacy/:id",
    [authJwt.isAdmin, objectId.validId],
    privacy.updatePolicy
  );
  app.delete(
    "/api/v1/admin/legal/privacy/:id",
    [authJwt.isAdmin],
    privacy.DeletePolicy
  );
};
