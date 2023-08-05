const express = require("express");
const offer_controllers = require("../controllers/banner");
const { authJwt, objectId } = require("../middlewares");

const router = express();

router.post("/admin/offer", [authJwt.isAdmin], offer_controllers.addoffer);
router.get("/admin/offer", [authJwt.isAdmin], offer_controllers.getOffers);
router.get(
  "/admin/offer/:id",
  [authJwt.isAdmin, objectId.validId],
  offer_controllers.getOffersById
);
router.delete(
  "/admin/offer/:id",
  [authJwt.verifyToken, objectId.validId],
  offer_controllers.deleteOffers
);

router.get("/offer", offer_controllers.getOffers);
router.get("/offer/:id", [objectId.validId], offer_controllers.getOffersById);
module.exports = router;
