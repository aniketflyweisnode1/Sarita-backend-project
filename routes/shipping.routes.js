// const shipping = require("../controllers/shippingOrder_controller");
// const { authJwt, validateShipping, objectId } = require("../middlewares");

// module.exports = (app) => {
//   app.post(
//     "/api/v1/shippings",
//     [authJwt.verifyToken, validateShipping.shippingBodies],
//     shipping.createShippingOrder
//   );
//   app.get(
//     "/api/v1/shippings",
//     [authJwt.verifyToken],
//     shipping.getShippingOrders
//   );
//   app.put("/api/v1/shippings/:id", shipping.updateShippingOrder);
//   app.delete(
//     "/api/v1/shippings/:id",
//     [authJwt.verifyToken],
//     shipping.deleteShippingOrder
//   );
//   app.get(
//     "/api/v1/shippings/:id",
//     [authJwt.verifyToken, objectId.validId],
//     shipping.getById
//   );
//   app.get(
//     "/api/v1/shippings/:userid ",
//     [authJwt.verifyToken],
//     shipping.getShippingOrdersByUser
//   );

//   app.get(
//     "/api/v1/admin/shippings",
//     [authJwt.isAdmin],
//     shipping.getShippingOrders
//   );
//   app.put(
//     "/api/v1/admin/shippings/:id",
//     [authJwt.isAdmin, objectId.validId],
//     shipping.updateShippingOrder
//   );
//   app.delete(
//     "/api/v1/admin/shippings/:id",
//     [authJwt.isAdmin],
//     shipping.deleteShippingOrder
//   );
//   app.get(
//     "/api/v1/admin/shippings/:id",
//     [authJwt.isAdmin],
//     shipping.getShippingOrderById
//   );

//   // tome orders
//   app.get(
//     "/api/v1/shippings/tome/:toMeId",
//     [authJwt.verifyToken],
//     shipping.getShippingOrder
//   );

//   //pacakge updates of shipping orders
//   app.put(
//     "/api/v1/shippings/:id/packages/:packageId",
//     [authJwt.verifyToken, objectId.validId],
//     shipping.removePackage
//   );
// };
