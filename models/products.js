const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: false
  },
  category: {
    type: String,
    required: true,
    enum: ['drinks', 'food', 'dessert']
  },
  price: {type: Number}, 
  ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}]
});

const Product = mongoose.model('Product', productSchema, 'products');

const getAll = async () => {
  return await Product
    .find()
    .populate('ingredients')
    .lean()
    .exec();
};

const productIsAvailable = async (productId, orderAmount) => {
  let product = await getProduct(productId)
  return new Promise((resolve, reject) => {
    product.ingredients.forEach(ingredient=> {
      // cancel order if not enough ingredients
      if (ingredient.amount < orderAmount) reject(false)
    })
    resolve(product)
  })
};

const getOrderTotal = async (orderData) => {
  let products = Object.keys(orderData).map(el => mongoose.Types.ObjectId(el))
  let result = await Product.find({ _id: { $in: products } }).select('_id price');
  return result.reduce((total, obj)=>{ return total + (obj.price * orderData[obj._id])}, 0)
}

const getProduct = async (productId) => {
  return await Product
    .findById(productId)
    .populate('ingredients')
    .exec();
};

const add = async (productData) => {
  productData.ingredients = productData.ingredients.map(el => mongoose.Types.ObjectId(el))
  const productInstance = new Product(productData);
  const result = await productInstance.save();
  return result;
};

const deleteOne = async (name) => {
  const result = await Product
    .deleteOne({
      name: name
    })
    .exec();
  return result.deletedCount;
};
module.exports = {getAll, deleteOne, add, productIsAvailable,  getOrderTotal}