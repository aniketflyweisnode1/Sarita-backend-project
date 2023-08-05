const countryController = require("../controllers/country_countroller");
const { authJwt } = require("../middlewares");
module.exports = (app) => {
    app.post(
        "/api/v1/countries",
        [authJwt.isAdmin],
        countryController.addCountry
    );
    app.get(
        "/api/v1/countries/:countryName",
        //[authJwt.verifyToken],
        countryController.getCountryByName
    );
    app.get(
        "/api/v1/countries",
        // [authJwt.verifyToken],
        countryController.getAllCountries
    );
    app.put(
        "/api/v1/countries/:id",
        [authJwt.isAdmin],
        countryController.updateCountry
    );
    app.delete(
        "/api/v1/countries/:id",
        [authJwt.isAdmin],
        countryController.deleteCountry
    );
    app.get(
        "/api/v1/country/:id",
        //[authJwt.verifyToken],
        countryController.getCountryById
    );
    app.get(
        "/api/v1/admin/countries",
        [authJwt.isAdmin],
        countryController.getAllCountries
    );
    app.get(
        "/api/v1/admin/country/:id",
        [authJwt.isAdmin],
        countryController.getCountryById
    );
};
