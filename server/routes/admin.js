const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Controller
const {
  orders, orderStatus
} = require('../controllers/admin');

router.get('/admin/orders', protect, adminProtect, orders);
router.put('/admin/order-status', protect, adminProtect, orderStatus);


module.exports = router;
