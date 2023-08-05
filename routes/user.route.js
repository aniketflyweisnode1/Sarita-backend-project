const userController = require("../controllers/user_controller");
const {
  authJwt,
  paramsVerifier,
  validateUserRequestBodies,
  objectId,
} = require("../middlewares");

module.exports = (app) => {
  app.delete(
    "/api/v1/users/:id",
    [authJwt.verifyToken, paramsVerifier.userInParams],
    userController.deleteUser
  );
  app.delete(
    "/api/v1/admin/users/:id",
    [authJwt.verifyToken, paramsVerifier.userInParams],
    userController.deleteUser
  );
  app.get("/api/v1/admin/users", [authJwt.isAdmin], userController.getUsers);
  app.get("/api/v1/users", [authJwt.verifyToken], userController.getUsers);
  app.put(
    "/api/v1/users/:id",
    [
      validateUserRequestBodies.UserUpdateBody,
      authJwt.verifyToken,
      paramsVerifier.userInParams,
    ],
    userController.updateUser
  );
  app.put(
    "/api/v1/admin/users/:id",
    [
      validateUserRequestBodies.UserUpdateBody,
      authJwt.isAdmin,
      paramsVerifier.userInParams,
    ],
    userController.updateUser
  );

  app.get(
    "/api/v1/user/:userId",
    [authJwt.verifyToken],
    userController.findByUserId
  );
  app.get("/api/v1/users/:id", [authJwt.verifyToken], userController.findById);
  app.get(
    "/api/v1/admin/users/:id",
    [authJwt.isAdmin, paramsVerifier.userInParams, objectId.validId],
    userController.findById
  );
};
