const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

// Create a new order
router.post('/', orderController.createOrder);

// Retrieve all orders
router.get('/', orderController.getAllOrders);

// Retrieve a specific order by ID
router.get('/:id', orderController.getOrderById);

// Update an order
router.put('/:id', orderController.updateOrder);

// Delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
