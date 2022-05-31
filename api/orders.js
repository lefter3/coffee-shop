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
    const foundItems = getAll();
    console.log(JSON.stringify(foundItems, undefined, 2));
    res.json(foundItems);
  } catch (err) {
    errorResponse(err, res);
  }
});

// ordersRouter.get('/:id', async (req, res) => {
//   // message
//   console.log(`GET Order id:${req.params.id}`);
//   // data
//   try {
//     const foundItem = await getOrder(req.params.id);
//     if (foundItem) {
//       console.log(JSON.stringify(foundItem, undefined, 2));
//       res.json(foundItem);
//     } else {
//       throw new Error('NOT_FOUND');
//     }
//   } catch (err) {
//     errorResponse(err, res);
//   }
// });

ordersRouter.post('/', async (req, res) => {
  // message
  console.log(`POST Order`);
  console.log(req.body);
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