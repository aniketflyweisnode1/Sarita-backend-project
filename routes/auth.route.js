const authController = require("../controllers/auth_controller");
const { validateUserRequestBodies, authJwt } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/api/v1/auth/signup",
    [validateUserRequestBodies.signUpBody, authJwt.verifyToken],
    authController.signUp
  );
  app.post(
    "/api/v1/auth/signin",
    [validateUserRequestBodies.signInBody],
    authController.signIn
  );
};
