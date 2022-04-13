const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Coupon = require('../models/Coupon');

// @desc    Get coupon
// @route   GET /api/coupons
// @access  Public
exports.getCoupon = asyncHandler(async (req, res, next) => {
  res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
});

// @desc    Get Single coupon
// @route   GET /api/coupon/:couponId
// @access  Public
exports.getSingleCoupon = asyncHandler(async (req, res, next) => {
  res.json(await Coupon.findById(req.params.couponId).exec());
});

// @desc    Create coupon
// @route   POST /api/coupon
// @access  Private / Admin
exports.createCoupon = asyncHandler(async (req, res, next) => {
  let { name, expired, discount } = req.body.coupon;

  res.json(await new Coupon({ name, expired, discount }).save());
});

// @desc    Delete coupon
// @route   DELETE /api/coupon/:couponId
// @access  Private / Admin
exports.deleteCoupon = asyncHandler(async (req, res, next) => {
  res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
});
