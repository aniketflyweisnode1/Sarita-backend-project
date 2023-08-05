const OrderController = require('../controllers/order_controller');

module.exports = (app)=>{
    app.post('/api/v1/orders',OrderController.createOrder);
    app.put('/api/v1/orders/:id',OrderController.updateOrder);
    app.delete('/api/v1/orders/:id',OrderController.deleteOrder);
    
    app.get('/api/v1/orders',OrderController.getOrders);
    app.get('/api/v1/orders/:id',OrderController.getOrdersById);
    app.get('/api/v1/orders/userId',OrderController.getOrdersByUser);
}