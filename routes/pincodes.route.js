const Pincode = require("../controllers/pincode.controller");
const { authJwt } = require("../middlewares");

module.exports = (app) => {
  app.post("/api/v1/admin/pincodes", [authJwt.isAdmin], Pincode.create);
  app.get("/api/v1/admin/pincodes", Pincode.get);
  app.get("/api/v1/admin/pincodes/:id", Pincode.getById);
  app.put("/api/v1/admin/pincodes/:id", Pincode.update);
  app.delete("/api/v1/admin/pincodes/:id", Pincode.delete);

  app.get("/api/v1/pincodes", Pincode.get);
  app.get("/api/v1/pincodes/:id", Pincode.getById);
};
