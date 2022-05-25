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

const Order = mongoose.model('Order', orderSchema, 'orders');

const getAllOrders = async () => {
  return await Order.find().lean().exec();
};

const getOrder = async (orderId) => {
  return await Order
    .findById(orderId)
    .lean()
    .exec();
};

const addOrder = async (orderData) => {
  // preparing field 'total' for orderData 
  const total = orderData.products.reduce((prev, curr) => prev + (curr.amount * curr.unitPrice), 0);
  const orderDataWithTotal = { ...orderData, total };

  const orderInstance = await new Order(orderDataWithTotal);
  const result = await orderInstance.save();
  return result._id;
};
module.exports = {getAllOrders, addOrder}