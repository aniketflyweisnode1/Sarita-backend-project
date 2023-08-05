const Tracking = require("../controllers/tracking_controller");

module.exports = (app) => {
  app.post("/api/v1/admin/trackings", Tracking.create);
  app.get("/api/v1/admin/trackings", Tracking.get);
  app.get("/api/v1/admin/trackings/:id", Tracking.getById);
  app.put("/api/v1/admin/trackings/:id", Tracking.update);
  app.delete("/api/v1/admin/trackings/:id", Tracking.delete);

  app.get("/api/v1/trackings", Tracking.get);
  app.get("/api/v1/trackings/:id", Tracking.getById);
};
