const express = require('express');
const ordersRouter = require('./orders');
const productsRouter = require('./products');
const ingredientsRouter = require('./ingredients');

// Create routers
const apiRouter = express.Router();
const groupingRouter = express.Router();
// Use routers
groupingRouter.use('/orders', ordersRouter);
groupingRouter.use('/products', productsRouter);
groupingRouter.use('/ingredients', ingredientsRouter);

apiRouter.use('/', groupingRouter);


// Main response - available paths info
apiRouter.get('/', (req, res) => {
  res.json({
    availablePaths: ['/orders', '/products', '/ingredients']
  });
});


// Error 404 handling
apiRouter.use((req, res, next) => {
  res.status(404).send('Page not found');
});
module.exports = apiRouter ;
