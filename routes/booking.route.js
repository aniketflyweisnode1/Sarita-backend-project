const booking = require("../controllers/booking.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/api/v1/shippings/:id/bookings",
    [authJwt.verifyToken, objectId.validId],
    booking.create
  );
  app.get("/api/v1/bookings", [authJwt.verifyToken], booking.get);
  app.get(
    "/api/v1/bookings/:id",
    [authJwt.verifyToken, objectId.validId],
    booking.getById
  );
  app.delete(
    "/api/v1/bookings/:id",
    [authJwt.verifyToken, objectId.validId],
    booking.delete
  );

  app.get("/api/v1/admin/bookings", [authJwt.isAdmin], booking.get);
  app.get(
    "/api/v1/admin/bookings/:id",
    [authJwt.isAdmin, objectId.validId],
    booking.getById
  );
  app.delete(
    "/api/v1/admin/bookings/:id",
    [authJwt.isAdmin, objectId.validId],
    booking.delete
  );
  app.put(
    "/api/v1/admin/bookings/:id",
    [authJwt.isAdmin, objectId.validId],
    booking.update
  );
  app.get("/api/v1/admin/booking", [authJwt.isAdmin], booking.getDailyBooking);
};
