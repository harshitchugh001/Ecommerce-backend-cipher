const Order = require('../models/order');


exports.createOrder = async (req, res) => {
  try {
    const { user, products, totalPrice } = req.body;

    const order = new Order({
      user,
      products,
      totalPrice,
     
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
};

// Retrieve all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name').populate('products.product', 'name price');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the orders' });
  }
};

// Retrieve a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate('user', 'name').populate('products.product', 'name price');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the order' });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, products, totalPrice } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { user, products, totalPrice },
      { new: true }
    ).populate('user', 'name').populate('products.product', 'name price');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the order' });
  }
};
