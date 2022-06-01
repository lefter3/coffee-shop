const express = require('express');
const {getAll, addIngredient} = require('../services/ingredients.js');
const {errorResponse} = require('../utils/errorResponse.js')

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', (req, res) => {
  res.json({
    availableMethods: [
      'GET /all',
      'POST /add'
    ]
  });
});

ingredientsRouter.get('/all', async (req, res) => {
  try {
    const ingredients = await getAll()
    res.json(ingredients);
  } catch (err) {
    errorResponse(err, res);
  }
})

ingredientsRouter.post('/add', async (req, res) => {
  const ingredient = req.body
  try {
    let result =  await addIngredient(ingredient);
    res.json(result);
  } catch (err) {
    errorResponse(err, res);
  }
})
module.exports = ingredientsRouter