const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    index: true,
  },
  role: {
    type: String,
    default: 'subscriber',
  },
  cart: {
    type: Array,
    default: [],
  },
  address: String,
  wishlist: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
