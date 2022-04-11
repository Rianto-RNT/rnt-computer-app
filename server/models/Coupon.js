const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    uppercase: true,
    required: [true, 'Coupon must have a name'],
    minlength: [6, 'Coupon must have 6 character length'],
    maxlength: [12, 'Coupon maximum character is 12'],
  },
  expired: {
    type: Date,
    require: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Coupon', CouponSchema);
