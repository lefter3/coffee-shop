const express = require('express');

const {addProduct, getAllProducts, deleteProduct} = require('../services/products.js');

const {errorResponse} = require('../utils/errorResponse.js');

const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
  res.json({
    availableMethods: [
      'GET /all',
      'GET /delete/:name',
      'POST'
    ]
  });
});

productsRouter.get('/all', async (req, res) => {
  try {
    const foundItems = await getAllProducts();
    res.json(foundItems);
  } catch (err) {
    errorResponse(err, res);
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    if (!Object.keys(req.body).length) throw new Error('MISSING_DATA');
    const addResult = addProduct(req.body);
    if (addResult) {
      console.log('Product added!');
      res.json({
        ok: true
      });
    } else {
      throw new Error('CONFLICT');
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

productsRouter.get('/delete/:name', async (req ,res) => {
  try {
    const deleteResult = deleteProduct(req.params.name);
    if (deleteResult) {
      console.log('Product deleted!');
      res.json({
        ok: true
      });
    } else {
      throw new Error('NOT_FOUND');
    }
  } catch (err) {
    errorResponse(err, res);
  }
});
module.exports = productsRouter