const packageController = require("../controllers/pickupSchedule.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/api/v1/admin/schedules/:id",
    [authJwt.isAdmin],
    packageController.create
  );
  app.get("/api/v1/admin/schedules", [authJwt.isAdmin], packageController.get);
  app.get(
    "/api/v1/admin/schedules/:id",
    [authJwt.isAdmin, objectId.validId],
    packageController.getById
  );
  app.delete(
    "/api/v1/admin/schedules/:id",
    [authJwt.isAdmin, objectId.validId],
    packageController.delete
  );
  app.put(
    "/api/v1/admin/schedules/:id",
    [authJwt.isAdmin, objectId.validId],
    packageController.update
  );

  //user
  app.get(
    "/api/v1/admin/schedules",
    [authJwt.verifyToken],
    packageController.get
  );

  app.get(
    "/api/v1/admin/schedules/:id",
    [authJwt.verifyToken, objectId.validId],
    packageController.getById
  );
};
