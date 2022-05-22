import express from 'express';

import { ordersRouter } from './orders.js';
import { productsRouter } from './products.js';
import { ingredientsRouter } from './ingredients.js';

// Create routers
export const mainRouter = express.Router();
const groupingRouter = express.Router();
// Use routers
groupingRouter.use('/orders', ordersRouter);
groupingRouter.use('/products', productsRouter);
groupingRouter.use('/ingredients', ingredientsRouter);

mainRouter.use('/', groupingRouter);


// Main response - available paths info
mainRouter.get('/', (req, res) => {
  res.json({
    availablePaths: ['/orders', '/products', '/ingredients']
  });
});


// Error 404 handling
mainRouter.use((req, res, next) => {
  res.status(404).send('Page not found');
});