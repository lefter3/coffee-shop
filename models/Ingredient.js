const mongoose = require('mongoose');
const Ingredient = new Schema({
  name: { type: String, required: true, unique: true },
  units: { type: Number, required: true },
  unitType: { type: String, required: false },
});

module.exports = mongoose.model('Ingredient', Ingredient);

export const getAllIngredients = async () => {
  return await Order.find().exec();
};

export const addOrUpdateIngredient = async () => {
  
  var query = {'name': req.body.name};

  MyModel.findOneAndUpdate(query, req.body, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send(doc);
  });
};