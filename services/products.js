const {getAll, add, deleteOne} = require('../models/products.js')

  const getAllProducts = async (searchFilters) => {
    // db connection
    return await getAll(searchFilters);
  }
  
  const addProduct = async (productData) => {
    try {
      // validation & db connection
      return await add(productData);
    } catch (err) {
      const error = new Error('VALIDATION_ERROR');
      error.reason = err.message;
      throw error;
    }
  }

  const deleteProduct = async (productId) => {
    try {
      // validation & db connection
      return await deleteOne(productId);
    } catch (err) {
      const error = new Error('VALIDATION_ERROR');
      error.reason = err.message;
      throw error;
    }
  }

module.exports = {addProduct, getAllProducts, deleteProduct}