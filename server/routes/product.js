const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Controller
const { getAllProduct, createProduct } = require('../controllers/product');

// Routes
router.get('/product', getAllProduct);
router.post('/product', protect, adminProtect, createProduct);

module.exports = router;
