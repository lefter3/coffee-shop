const express = require('express');

const {addProduct, getAllProducts, deleteProduct} = require('../services/products.js');

const {errorResponse} = require('../errorResponse.js');

const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
  res.json({
    availableMethods: [
      'GET /all',
      'GET /delete/:id',
      'POST'
    ]
  });
});

productsRouter.get('/all', async (req, res) => {
  // message
  const searchFilters = req.query;
  const areFiltersUsed = !!Object.keys(searchFilters).length;
  if (!areFiltersUsed) {
    console.log('GET Products - All available products');
  } else {
    const usedFilters = Object.keys(searchFilters).map(queryKey => ` * ${queryKey}: ${searchFilters[queryKey]}`);
    console.log(`GET Products - Used filters: \n${usedFilters.join('\n')}`);
  }
  // data
  try {
    const foundItems = await getAllProducts(searchFilters);
    console.log(foundItems);
    res.json(foundItems);
  } catch (err) {
    errorResponse(err, res);
  }
});

productsRouter.post('/', async (req, res) => {
  // message
  console.log(`POST Product`);
  console.log(req.body);
  // data
  try {
    if (!Object.keys(req.body).length) throw new Error('MISSING_DATA');
    const addResult = addProduct( { _id: req.params.id, ...req.body } );
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

productsRouter.get('/delete/:id', async (req ,res) => {
  // message
  console.log(`DELETE Product id:${req.params.id}`);
  // data
  try {
    const deleteResult = deleteProduct(req.params.id);
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