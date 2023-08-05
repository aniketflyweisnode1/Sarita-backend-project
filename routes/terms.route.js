const terms = require("../controllers/terms");

module.exports = (app) => {
  app.post("/api/v1/admin/terms", terms.create);
  app.put("/api/v1/admin/terms/:id", terms.update);
  app.get("/api/v1/admin/terms/:id", terms.getId);
  app.get("/api/v1/admin/terms", terms.get);
  app.delete("/api/v1/admin/terms/:id", terms.delete);

  app.get("/api/v1/terms/:id", terms.getId);
  app.get("/api/v1/terms", terms.get);
};
