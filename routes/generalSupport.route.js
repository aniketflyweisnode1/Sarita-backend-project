const generalSupport = require("../controllers/generalSuport.controller");
const {authJwt,validateBodies} = require("../middlewares");
module.exports = (app) => {
  app.post("/api/v1/supports/generalsupport",[authJwt.verifyToken,validateBodies.technicalSupportBodies] , generalSupport.create);
  app.get("/api/v1/supports/generalsupport",[authJwt.verifyToken] , generalSupport.getAllSupports);
  app.get("/api/v1/supports/generalsupport/:id",[authJwt.verifyToken] , generalSupport.getOneSupports);

  
  app.get("/api/v1/supports/admin/generalsupport",[authJwt.isAdmin] , generalSupport.getAllSupports);
  app.get("/api/v1/supports/admin/generalsupport/:id",[authJwt.isAdmin] , generalSupport.getOneSupports);
};
