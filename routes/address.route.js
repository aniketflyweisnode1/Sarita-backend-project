const address = require('../controllers/address_controller');
module.exports = app => {
    app.post('/api/v1/addresses', address.createAddress);
    app.get('/api/v1/addresses', address.getAddresses);
    app.put('/api/v1/addresses', address.updateAddress);
    // app.delete('/api/v1/addresses', address.deleteAddress);
    app.get('/api/v1/addresses/:id', address.getAddressById);

}