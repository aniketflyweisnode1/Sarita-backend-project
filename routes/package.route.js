const packageController = require("../controllers/packageController");
const { authJwt, validateShipping } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/api/v1/packages",
    [validateShipping.PackageBodies],
    packageController.createPackage
  );
  app.get("/api/v1/packages", packageController.getPackages);
  app.get("/api/v1/packages/:id", packageController.getPackagesById);
  app.delete("/api/v1/packages/:id", packageController.deletePackage);
  app.put("/api/v1/packages/:id", packageController.updatePackage);
};
