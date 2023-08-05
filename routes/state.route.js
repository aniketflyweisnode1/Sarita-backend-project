const State = require("../controllers/state.controller");

module.exports = (app) => {
  app.post("/api/v1/admin/states", State.create);
  app.get("/api/v1/admin/states", State.get);
  app.get("/api/v1/admin/states/:id", State.getById);
  app.put("/api/v1/admin/states/:id", State.update);
  app.delete("/api/v1/admin/states/:id", State.delete);

  app.get("/api/v1/states", State.get);
  app.get("/api/v1/states/:id", State.getById);
};
