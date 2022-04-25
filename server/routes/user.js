const express = require('express');

const router = express.Router();

// Midleware
const { protect } = require('../middlewares/auth');
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
} = require('../controllers/user');

router.get('/user/cart', protect, getUserCart);
router.post('/user/cart', protect, userCart);
router.delete('/user/cart', protect, emptyCart);
router.post('/user/address', protect, saveAddress);

router.post('/user/order', protect, createOrder);

// Coupon Apply in frontend save to database
router.post('/user/cart/coupon', protect, applyCouponToUserCart);

// router.get('/user', (req, res) => {
//     res.json({
//       success: true,
//       data: 'Hit it!!! user API endpoint',
//     });
//   });

module.exports = router;
