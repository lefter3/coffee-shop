const {getAllOrders, addOrder} = require('../models/orders.js')
const {updateInventoryAmountDueToOrder} = require('../models/ingredients.js');

  const getAll = async (searchFilters) => {
    return await getAllOrders(searchFilters);
  }

  const constaddOrders = async (orderData) => {
    try {
      // update the 'ingredients' collection
      const productsWithAmountToSubtract = orderData.products.map(product => ({
        ...product,
        amount: product.amount * (-1)
      }));
      //TODO Promise.all()
      await updateInventoryAmountDueToOrder(productsWithAmountToSubtract);
      return await addOrder(orderData);
    } catch (err) {
      const error = new Error('VALIDATION_ERROR');
      error.reason = err.message;
      throw error;
    }
  }

module.exports = {getAll, addOrder}