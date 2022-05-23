const express = require('express');
const Ingredients = require('../services/ingredients.js');
const errorResponse = require('../errorResponse.js')

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', (req, res) => {
  res.json({
    availableMethods: [
      'GET /all',
      'POST /add'
    ]
  });
});

ingredientsRouter.get('/all', (req, res) => {
  try {
    const ingredients = Ingredients.getAllIngredients()
    res.json(ingredients);
  } catch (err) {
    errorResponse(err, res);
  }
    
})

ingredientsRouter.post('/add', (req, res) => {
  try {
    let ingredient = Ingredients.addOrUpdateIngredient(req.body)
    res.json(ingredient);
  } catch (err) {
    errorResponse(err, res);
  }
})
module.exports = ingredientsRouter