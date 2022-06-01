const express = require('express');
const {addOrders, getAll} = require('../services/orders.js');
const {errorResponse} = require('../utils/errorResponse.js')

const ordersRouter = express.Router();

ordersRouter.get('/', (req, res) => {
  res.json({
    availableMethods: [
      'GET /all',
      'GET /:id',
      'POST'
    ]
  });
});

ordersRouter.get('/all', async (req, res) => {
  try {
    const foundItems = await getAll();
    res.json(foundItems);
  } catch (err) {
    errorResponse(err, res);
  }
});

ordersRouter.post('/', async (req, res) => {
  // message
  // data
  try {
    if (!Object.keys(req.body).length) throw new Error('MISSING_DATA');
    const addResult = addOrders(req.body );
    if (addResult) {
      console.log('Order added!');
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
module.exports = ordersRouter