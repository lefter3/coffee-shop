const {getAllIngredients, addOrUpdateIngredient} = require( '../models/ingredients.js')

  const getAll = async () => {
    return await getAllIngredients();
  }

  const addIngredient = async (ingredient) => {
      return await addOrUpdateIngredient(ingredient);
  }

module.exports = {getAll, addIngredient}