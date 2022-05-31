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
    .populate('ingredients')
    .lean()
    .exec();
};

const isAvailable = async (productId, orderAmount) => {
  let product = await getProduct(productId)
  return new Promise((resolve, reject) => {
    product.ingredients.forEach(ingredient=> {
      if (ingredient.amount < orderAmount) reject(false)
    })
    resolve(product)
  })
};

const getSelectedProductsForOrder = async (order) => {
  console.log(getSelectedProductsForOrder)
  let productIds = Object.keys(order)
  let promises = []
  productIds.forEach(id=>{
    promises.push(isAvailable(id, order[id].amount))
  })
  Promise.allSettled(promises).then(result => {
    console.log(result)
  })
};

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

const deleteOne = async (productId) => {
  const result = await Product
    .deleteOne({
      _id: productId
    })
    .exec();
  return result.deletedCount;
};
module.exports = {getAll, deleteOne, add, getSelectedProductsForOrder}