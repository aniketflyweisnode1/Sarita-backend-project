const discountController = require("../controllers/discount.controller");
const { discountCoupon, authJwt } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/admin/coupens",
    [discountCoupon.couponBodies, authJwt.isAdmin],
    discountController.create
  );
  app.get(
    "/api/v1/coupens/:id",

    discountController.getDiscountById
  );
  app.put(
    "/api/v1/admin/coupens/:id",
    [authJwt.isAdmin],
    discountController.update
  );
  app.delete(
    "/api/v1/admin/coupens/:id",
    [authJwt.isAdmin],
    discountController.delete
  );
  app.get(
    "/api/v1/coupens",

    discountController.getDiscounts
  );
  app.get(
    "/api/v1/admin/coupens/:id",
    [authJwt.isAdmin],
    discountController.getDiscountById
  );
  app.get("/api/v1/admin/coupens", discountController.getDiscounts);
};
