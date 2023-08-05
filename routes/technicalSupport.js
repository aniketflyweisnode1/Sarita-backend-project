const technicalSupport = require("../controllers/technicalSupport");
const { authJwt, validateBodies } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/supports/technicalsupport",
    [authJwt.verifyToken, validateBodies.technicalSupportBodies],
    technicalSupport.create
  );
  app.get(
    "/api/v1/supports/technicalsupport",
    [authJwt.verifyToken],
    technicalSupport.getAllSupports
  );
  app.get(
    "/api/v1/supports/technicalsupport/:id",
    [authJwt.verifyToken],
    technicalSupport.getOneSupports
  );

  app.get(
    "/api/v1/supports/admin/technicalsupport",
    [authJwt.isAdmin],
    technicalSupport.getAllSupports
  );
  app.get(
    "/api/v1/supports/admin/technicalsupport/:id",
    [authJwt.isAdmin],
    technicalSupport.getOneSupports
  );
};
