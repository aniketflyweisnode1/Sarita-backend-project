const dispute = require("../controllers/dispute.controller");
const { authJwt } = require("../middlewares");

module.exports = (app) => {
  app.post("/api/v1/legal/disputes", [authJwt.isAdmin], dispute.addDisputed);
  app.put(
    "/api/v1/legal/disputes/:id",
    [authJwt.isAdmin],
    dispute.updateDispute
  );
  app.delete(
    "/api/v1/legal/disputes/:id",
    [authJwt.isAdmin],
    dispute.deleteDispute
  );

  app.get("/api/v1/legal/disputes/:id", dispute.getDisputesById);
  app.get("/api/v1/legal/disputes", dispute.getDisputes);
};
