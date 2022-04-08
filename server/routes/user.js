const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');
const { userCart, getUserCart } = require('../controllers/user');

router.post('/user/cart', protect, userCart);
router.get('/user/cart', protect, getUserCart);

// router.get('/user', (req, res) => {
//     res.json({
//       success: true,
//       data: 'Hit it!!! user API endpoint',
//     });
//   });

module.exports = router;
