const City = require("../controllers/city.controller");
const { authJwt } = require("../middlewares");

module.exports = (app) => {
  app.post("/api/v1/admin/cities", [authJwt.isAdmin], City.create);
  app.get("/api/v1/admin/cities", City.get);
  app.get("/api/v1/admin/cities/:id", City.getById);
  app.put("/api/v1/admin/cities/:id", City.update);
  app.delete("/api/v1/admin/cities/:id", City.delete);

  app.get("/api/v1/cities", City.get);
  app.get("/api/v1/cities/:id", City.getById);
};
