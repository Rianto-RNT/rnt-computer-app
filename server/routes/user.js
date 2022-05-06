const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist
} = require('../controllers/user');

router.get('/user/cart', protect, getUserCart);
router.post('/user/cart', protect, userCart);
router.delete('/user/cart', protect, emptyCart);
router.post('/user/address', protect, saveAddress);

router.post('/user/order', protect, createOrder);
router.get('/user/orders', protect, orders);

// Coupon Apply in frontend save to database
router.post('/user/cart/coupon', protect, applyCouponToUserCart);


// User Wishlist
router.post('my-account/wishlist', protect, addToWishlist)
router.get('my-account/wishlist', protect, wishlist)
router.put('my-account/wishlist/:productId', protect, removeFromWishlist)

// router.get('/user', (req, res) => {
//     res.json({
//       success: true,
//       data: 'Hit it!!! user API endpoint',
//     });
//   });

module.exports = router;
