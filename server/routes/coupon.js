const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Controller
const {
  createCoupon,
  getCoupon,
  deleteCoupon,
} = require('../controllers/coupon');

// Routes
router.get('/coupons', getCoupon);
router.post('/coupon', protect, adminProtect, createCoupon);
router.delete('/coupon/:couponId', protect, adminProtect, deleteCoupon);

module.exports = router;
