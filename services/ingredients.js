const Ingredients = require( '../models/ingredients.js')

class Ingredient {
  async getAllIngredients() {
    // db connection
    return await Ingredients.getAllIngredients();
  }

  async addIngredient(ingredient) {
    try {
      // validation & db connection
      return await Ingredients.addIngredient(ingredient);
    } catch (err) {
      const error = new Error();
      error.reason = err.message;
      throw error;
    }
  }
}