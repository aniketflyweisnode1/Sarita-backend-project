const items = require("../controllers/items.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
  app.post("/api/v1/admin/items", [authJwt.isAdmin], items.create);
  app.put(
    "/api/v1/admin/items/add/:id",
    [authJwt.isAdmin, objectId.validId],
    items.updateAdd
  );
  app.put(
    "/api/v1/admin/items/remove/:id",
    [authJwt.isAdmin, objectId.validId],
    items.updateRemove
  );
  app.get("/api/v1/admin/items", [authJwt.isAdmin], items.get);
  app.get("/api/v1/admin/items/:id", [objectId.validId], items.getById);
  app.delete(
    "/api/v1/admin/items/:id",
    [authJwt.isAdmin, objectId.validId],
    items.delete
  );
  app.get("/api/v1/items", [authJwt.isAdmin], items.get);
  app.get("/api/v1/items/:id", [objectId.validId], items.getById);
};
