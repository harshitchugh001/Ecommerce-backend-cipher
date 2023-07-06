const Product = require('../models/product');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
      const { name, description, price, quantity } = req.body;
  
      const product = new Product({
        name,
        description,
        price,
        quantity,
      });
  
      const savedProduct = await product.save();
  
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error creating product:', error); 
      res.status(500).json({ error: 'An error occurred while creating the product' });
    }
  };
  

// Retrieve all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the products' });
  }
};

// Retrieve a specific product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the product' });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, quantity },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the product' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
};
