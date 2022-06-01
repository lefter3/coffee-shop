const {getAllOrders, addOrder} = require('../models/orders.js')
const {productIsAvailable, getOrderTotal} = require('../models/products.js');
const {updateIngredient} = require('../models/ingredients.js');
const { errorResponse } = require('../utils/errorResponse.js');

  const getAll = async (searchFilters) => {
    return await getAllOrders(searchFilters);
  }
  
  const getSelectedProductsForOrder = async (order) => {
    let productIds = Object.keys(order)
    let promises = []
    productIds.forEach(id=>{
      promises.push(productIsAvailable(id, order[id]))
    })
    return await Promise.all(promises)
  }; 
  const updateIngredientsForAllOrder = async (order, orderIngredients) => {
    let allIngredients  = []
    let result = []
    orderIngredients.forEach(product => {
      product.ingredients.forEach(ingredient => {
        allIngredients.push({[ingredient._id] : order[product._id]})
      })
    });
    let promises = []
    allIngredients.forEach(obj => {
      ingredient = Object.keys(obj)[0]
      if (result[ingredient]) result[ingredient] += obj[ingredient]
      else result[ingredient] = obj[ingredient]
      promises.push(updateIngredient(ingredient, result[ingredient]))
    })
    return await Promise.all(promises)
  }

  const addOrders = async (orderData) => {
    try {
      // Get Products && check for inventory
      let result = await getSelectedProductsForOrder(orderData)
      console.log(result[0].ingredients)
      if (result == false) throw new Error('INVENTORY')
      let total = await getOrderTotal(orderData)
      let order = {
        products: [],
        total: total
      }
      for (const [key, value] of Object.entries(orderData)) {
        order.products.push({_id: key, amount: value})
      }
      addOrder(order).then((res) => {
        return updateIngredientsForAllOrder(orderData, result)
      });
    } catch (err) {
      errorResponse(err);
    }
  }

module.exports = {getAll, addOrders}