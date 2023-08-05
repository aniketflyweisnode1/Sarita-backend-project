const Dimension = require("../controllers/dimension.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
  app.post("/api/v1/admin/dimensions", [authJwt.isAdmin], Dimension.create);
  app.get("/api/v1/admin/dimensions", Dimension.get);
  app.get(
    "/api/v1/admin/dimensions/:id",
    [objectId.validId],
    Dimension.getById
  );
  app.put(
    "/api/v1/admin/dimensions/:id",
    [authJwt.isAdmin, objectId.validId],
    Dimension.update
  );
  app.delete(
    "/api/v1/admin/dimensions/:id",
    [authJwt.isAdmin, objectId.validId],
    Dimension.delete
  );

  app.get("/api/v1/dimensions", Dimension.get);
  app.get("/api/v1/dimensions/:id", [objectId.validId], Dimension.getById);
};
