const Order = require('../models/orders.js')
const {updateInventoryAmountDueToOrder} = require('../models/ingredients.js');

class Orders {

  async getAllOrders(searchFilters) {
    return await Order.getAllOrders(searchFilters);
  }

  async addOrder(orderData) {
    try {
      // update the 'ingredients' collection
      const productsWithAmountToSubtract = orderData.products.map(product => ({
        ...product,
        amount: product.amount * (-1)
      }));
      //TODO Promise.all()
      await updateInventoryAmountDueToOrder(productsWithAmountToSubtract);
      return await Order.addOrder(orderData);
    } catch (err) {
      const error = new Error('VALIDATION_ERROR');
      error.reason = err.message;
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      // update the 'ingredients' collection
      const oldOrder = await Order.getOrder(orderId);
      const productsWithAmountToAdd = oldOrder.products;
      await updateInventoryAmountDueToOrder(productsWithAmountToAdd);
      // validation & db connection
      return await Order.deleteOrder(orderId);
    } catch (err) {
      const error = new Error('VALIDATION_ERROR');
      error.reason = err.message;
      throw error;
    }
  }
}