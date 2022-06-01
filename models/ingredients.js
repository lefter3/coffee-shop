const mongoose = require('mongoose');
const ingredientScheema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  unitType: { type: String, required: false },
});

const Ingredient = mongoose.model('Ingredient', ingredientScheema, 'ingredients');

const getAllIngredients = async () => {
  return await Ingredient.find().lean().exec();
};
const updateIngredient = async(ingredientId, amount) => {
  return await Ingredient.findOneAndUpdate({_id :ingredientId}, {$inc : {amount : amount*-1}}).exec();
}
const addOrUpdateIngredient = async (ingredient) => {
  var query = {'name': ingredient.name};
  return await Ingredient.findOneAndUpdate(query, ingredient, {new: true, upsert: true}).exec();
};

module.exports = {getAllIngredients, addOrUpdateIngredient, updateIngredient}