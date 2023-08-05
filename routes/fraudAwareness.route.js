const fraudcontroller = require("../controllers/fraundAwareness.controller");
const { authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
    app.get(
        "/api/v1/admin/fraudawareness",

        fraudcontroller.getALl
    );
    app.get(
        "/api/v1/admin/fraudawareness/:id",
        [objectId.validId],
        fraudcontroller.getById
    );

    app.post(
        "/api/v1/admin/fraudawareness",
        [authJwt.isAdmin],
        fraudcontroller.create
    );
    app.put(
        "/api/v1/admin/fraudawareness/:id",
        [authJwt.isAdmin],
        fraudcontroller.update
    );
    app.delete(
        "/api/v1/admin/fraudawareness/:id",
        [authJwt.isAdmin],
        fraudcontroller.delete
    );
    app.get("/api/v1/fraudawareness", fraudcontroller.getALl);
    app.get("/api/v1/fraudawareness/:id", fraudcontroller.getById);
};
