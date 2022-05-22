import {
  getAllIngredients as dbGetAllIngredients,
  addOrUpdateIngredient as dbAddIngredient,
} from '../models/ingredients.js';

export default class Ingredient {
  async getAllIngredients() {
    // db connection
    return await dbGetAllIngredients();
  }

  async addIngredient(ingredient) {
    try {
      // validation & db connection
      return await dbAddIngredient(ingredient);
    } catch (err) {
      const error = new Error();
      error.reason = err.message;
      throw error;
    }
  }
}