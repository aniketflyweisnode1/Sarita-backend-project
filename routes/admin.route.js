const adminController = require("../controllers/admin_controller");
const {
  authJwt,
  validateUserRequestBodies,
  objectId,
} = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/admin/signup",
    [validateUserRequestBodies.adminSignUpBody],
    adminController.signUp
  );
  app.post(
    "/api/v1/admin/signin",
    [validateUserRequestBodies.adminSignInBody],
    adminController.signIn
  );
  app.get("/api/v1/admins", [authJwt.isAdmin], adminController.getAdmins);
  app.get(
    "/api/v1/admins/:id",
    [authJwt.isAdmin, objectId.validId],
    adminController.findByAdminId
  );
  app.delete(
    "/api/v1/admins/:id",
    [authJwt.isAdmin, objectId.validId],
    adminController.deleteAdmin
  );
  app.put(
    "/api/v1/admins/:id",
    [authJwt.isAdmin, objectId.validId],
    adminController.updateAdmin
  );
  app.put("/api/v1/admins", [authJwt.isAdmin], adminController.updatePassword);
};
