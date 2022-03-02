const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Controller
const { createProduct } = require('../controllers/product');

// Routes
router.post('/product', protect, adminProtect, createProduct);

module.exports = router;
