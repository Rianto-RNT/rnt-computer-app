const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: ObjectId,
        ref: 'Product',
      },
      count: Number,
      color: String,
      price: Number,
    },
  ],
  cartTotal: Number,
  totalAfterDiscount: Number,
  orderedBy: {
    type: ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cart', CartSchema);
