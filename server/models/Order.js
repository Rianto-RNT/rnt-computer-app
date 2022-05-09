const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
      count: Number,
      color: String,
    },
  ],
  paymentIntent: {},
  orderStatus: {
    type: String,
    default: 'Not Processed',
    enum: [
      'Not Processed',
      'Cash On Delivery',
      'Processing',
      'Dispatched',
      'Cancelled',
      'Completed',
    ],
  },
  orderedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
