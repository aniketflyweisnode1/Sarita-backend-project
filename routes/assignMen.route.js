const pickup = require("../controllers/assignPickup.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
  app.post("/api/v1/admin/pickupmens/:id", [authJwt.isAdmin], pickup.create);

  app.get("/api/v1/admin/pickupmens", [authJwt.isAdmin], pickup.get);

  app.get(
    "/api/v1/admin/pickupmens/:id",
    [authJwt.isAdmin, objectId.validId],
    pickup.getById
  );
  app.put(
    "/api/v1/admin/pickupmens/:id",
    [authJwt.isAdmin, objectId.validId],
    pickup.update
  );
  app.delete(
    "/api/v1/admin/pickupmens/:id",
    [authJwt.isAdmin, objectId.validId],
    pickup.delete
  );

  //user
  app.get("/api/v1/admin/pickupmens", [authJwt.verifyToken], pickup.get);

  app.get(
    "/api/v1/admin/pickupmens/:id",
    [authJwt.verifyToken, objectId.validId],
    pickup.getById
  );
};
