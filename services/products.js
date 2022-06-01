const {getAll, add, deleteOne} = require('../models/products.js')

  const getAllProducts = async () => {
    // db connection
    return await getAll();
  }
  
  const addProduct = async (productData) => {
    try {
      // validation & db connection
      delete productData._id
      return await add(productData);
    } catch (err) {
      // error.reason = err.message;
      throw err;
    }
  }

  const deleteProduct = async (name) => {
    try {
      // validation & db connection
      return await deleteOne(name);
    } catch (err) {
      const error = new Error('VALIDATION_ERROR');
      error.reason = err.message;
      throw error;
    }
  }

module.exports = {addProduct, getAllProducts, deleteProduct}