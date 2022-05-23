const Product = require('../models/products.js')

class Products {
  async getAllProducts(searchFilters) {
    // db connection
    return await Product.getAllProducts(searchFilters);
  }
  
  async addProduct(productData) {
    try {
      // validation & db connection
      return await Product.addProduct(productData);
    } catch (err) {
      const error = new Error('VALIDATION_ERROR');
      error.reason = err.message;
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      // validation & db connection
      return await Product.deleteProduct(productId);
    } catch (err) {
      const error = new Error('VALIDATION_ERROR');
      error.reason = err.message;
      throw error;
    }
  }
}