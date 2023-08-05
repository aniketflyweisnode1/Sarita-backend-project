const { application } = require("express");
const LegalController = require("../controllers/legalNotice_controller");
const { authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
    app.post(
        "/api/v1/admin/legal/legalNotices",
        [authJwt.isAdmin],
        LegalController.addLegal
    );
    app.get(
        "/api/v1/admin/legal/legalNotices/:id",
        [objectId.validId],
        LegalController.getLegalById
    );
    app.get(
        "/api/v1/admin/legal/legalNotices",

        LegalController.getLegal
    );
    app.delete(
        "/api/v1/admin/legal/legalNotices/:id",
        [authJwt.isAdmin, objectId.validId],
        LegalController.DeleteLegal
    );
    app.get(
        "/api/v1/admin/legal/legalNotices",
        //[authJwt.isAdmin],
        LegalController.getLegal
    );
    app.put(
        "/api/v1/admin/legal/legalNotices/:id",
        [objectId.validId],
        LegalController.updateLegal
    );
};
