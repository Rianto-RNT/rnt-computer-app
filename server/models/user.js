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
  address: {
    fullAddress: String,
    noteFromUser: String,
    userFullName: String,
    phoneNumber: Number,
  },
  //   wishlist: [{ type: ObjectId, ref: 'Product' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
