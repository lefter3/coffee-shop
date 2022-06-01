const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  products: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    amount: {
      type: Number,
      required: true,
    }
  }],
  total: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

const getAllOrders = async () => {
  return await Order.find().exec();
};

const getOrder = async (orderId) => {
  return await Order
    .findById(orderId)
    .lean()
    .exec();
};

const addOrder = async (orderData) => {
  const orderInstance = await new Order(orderData);
  const result = await orderInstance.save();
  return result;
};
module.exports = {getAllOrders, addOrder}