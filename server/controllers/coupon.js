const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Coupon = require('../models/Coupon');

// @desc    Get coupon
// @route   GET /api/coupons
// @access  Public
exports.getCoupon = asyncHandler(async (req, res, next) => {
  let coupon = await Coupon.find({}).sort({ createdAt: -1 }).exec();

  if (!coupon) {
    return next(
      new ErrorResponse(
        `Coupon not found with ${req.params.couponId}. Please add corect value`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: coupon });
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
  let coupon = await Coupon.findByIdAndDelete(req.params.couponId).exec();

  if (!coupon) {
    return next(
      new ErrorResponse(
        `Coupon not found with ${req.params.couponId}. Please add corect value`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: coupon });
});
