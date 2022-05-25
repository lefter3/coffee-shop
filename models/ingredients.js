const mongoose = require('mongoose');
const ingredientScheema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  units: { type: Number, required: true },
  unitType: { type: String, required: false },
});

const Ingredient = mongoose.model('Ingredient', ingredientScheema, 'ingredients');

const getAllIngredients = async () => {
  return await Ingredient.find().lean().exec();
};
updateInventoryAmountDueToOrder = async () => {
  
}
const addOrUpdateIngredient = async (ingredient) => {
  var query = {'name': ingredient.name};

  Ingredient.findOneAndUpdate(query, ingredient, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return doc;
  });
};

module.exports = {getAllIngredients, addOrUpdateIngredient}