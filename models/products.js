const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  category: {
    type: [String],
    required: true,
    enum: ['coffee', 'food', 'tea', 'dessert']
  },
  ingredients: [{
    ingredient: {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'},
    qnt: {type: Number, required: false},
    quantityType: {type: String, required: false}
  }]
});

const Product = mongoose.model('Product', productSchema, 'products');

const updateProductsAmountDueToOrder = async (productsData) => {
  // 'for' loop approach since map/forEach methods did not finish Promises
  const updateResultsArr = [];
  const missingProducts = [];
  for (let i = 0; i < productsData.length; i++) {
    const { _id, amount } = productsData[i];
    const result = await Product
      .updateOne(
        {
          _id: mongoose.Types.ObjectId(_id),
          available: { '$gte': 0 } // it prevents to receive negative product amount when '$inc'
        },
        {
          '$inc': {
            'available': amount
          }
        },
        { upsert: false }
      )
      .exec();

    updateResultsArr.push(result.nModified);

    // Build error info: product amount is going to be < 0
    if (result.nModified === 0) {
      missingProducts.push(productsData[i].name);
    }
  }

  // Error: product amount is going to be < 0
  if (missingProducts.length) {
    missingProducts.forEach(missingProduct => {
      console.log(`Ordered product - ${missingProduct} - is not available (amount 0)`);
    });
    throw new Error('PRODUCT_NOT_AVAILABLE');
  }
};

const getAll = async () => {

  
  return await Product
    .find()
    .populate('ingrdients.ingredient')
    .exec();
};

const getSelectedProductsForOrder = async (productIds) => {
  return await Product
    .find({
      _id: {
        '$in': productIds
      }
    })
    .lean()
    .exec();
};

const getProduct = async (productId) => {
  return await Product
    .findById(productId)
    .lean()
    .exec();
};

const add = async (productData) => {
  const productInstance = new Product(productData);
  const result = await productInstance.save();
  return result._id;
};

const deleteOne = async (productId) => {
  const result = await Product
    .deleteOne({
      _id: productId
    })
    .exec();
  return result.deletedCount;
};
module.exports = {getAll, deleteOne, add}