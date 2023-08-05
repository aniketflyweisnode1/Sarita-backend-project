const { application } = require("express");
const endUser = require("../controllers/endUserAgreeMent");
const { authJwt } = require("../middlewares");
module.exports = (app) => {
  app.post("/api/v1/legal/enduser", [authJwt.isAdmin], endUser.addEndUser);
  app.get(
    "/api/v1/legal/enduser/:id",

    endUser.getEndUserById
  );
  app.get("/api/v1/legal/enduser", endUser.getEndUser);
  app.delete(
    "/api/v1/admin/legal/enduser/:id",
    [authJwt.isAdmin],
    endUser.DeleteEndUser
  );
  app.get(
    "/api/v1/admin/legal/enduser",

    endUser.getEndUser
  );
  app.put(
    "/api/v1/admin/legal/enduser",
    [authJwt.isAdmin],
    endUser.updateEndUser
  );
};
