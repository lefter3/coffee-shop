const {getAllOrders, addOrder} = require('../models/orders.js')
const {getSelectedProductsForOrder} = require('../models/products.js');

  const getAll = async (searchFilters) => {
    return await getAllOrders(searchFilters);
  }

  const addOrders = async (orderData) => {
    try {
      getSelectedProductsForOrder(orderData)

      return await addOrder(orderData);
    } catch (err) {
      throw err;
    }
  }

module.exports = {getAll, addOrders}