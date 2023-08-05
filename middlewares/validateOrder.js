// const User = require("../models/user.model");
// const ShippingOrder = require("../models/shippingOrder");

// const validateOrderBody = async (req, res, next) => {
//   try {
//     if (!req.userInParams) {
//       return res.status(400).json({
//         message: "you must be valid user",
//       });
//     }

//     if (req.body.shippingId) {
//       if (!ObjectIdChecker.isValidObjectId(req.body.shippingId)) {
//         return res.status(400).send({
//           message: "Invalid shippingId provided",
//         });
//       }
//     } else {
//       if (!req.body.shippingId) {
//         return res.status(400).json({
//           message: "you must provide shippingId",
//         });
//       }
//       const shippingOrder = await ShippingOrder.findById(req.body.shippingId);
//       if (!shippingOrder) {
//         return res.status(400).json({
//           message: "you must provide valid shippingId",
//         });
//       }
//       req.shippingId = shippingOrder._id;
//     }

//     if (!req.body.totalAmount) {
//       return res.status(400).json({
//         message: "you must provide totalAmount",
//       });
//     }

//     next();
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       error: e,
//       message: "internal server error",
//     });
//   }
// };

// module.exports = {
//   validateOrderBody:validateOrderBody,
// };
