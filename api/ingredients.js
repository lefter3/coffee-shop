import express from 'express';

import Ingredients from '../services/ingredients.js';

const ingredients = new Ingredients();

export const ingredientsRouter = express.Router();

ingredientsRouter.get('/', (req, res) => {
  res.json({
    availableMethods: [
      'GET /all',
      'POST /add'
    ]
  });
});

ingredientsRouter.get('/all', (req, res) => {
    const ingredients = Ingredients.getAllIngredients()
    res.json(ingredients)
})

ingredientsRouter.post('/add', (req, res) => {
    Ingrediets.addOrUpdateIngredient(req.body)
})