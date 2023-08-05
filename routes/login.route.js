const loginController = require("../controllers/login_controller");
const { objectId } = require("../middlewares");
module.exports = (app) => {
  app.post("/api/v1/auth/login", loginController.login);
  app.post(
    "/api/v1/auth/login/:id/verify",
    [objectId.validId],
    loginController.verifyOtp
  );
};
