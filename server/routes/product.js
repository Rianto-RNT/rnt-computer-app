const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Controller
const {
  getAllProduct,
  listAllProduct,
  createProduct,
  removeProduct,
  uploadImages,
  removeImages,
} = require('../controllers/product');

// Routes
router.get('/product', getAllProduct);
router.get('/product/:count', listAllProduct);
router.post('/product', protect, adminProtect, createProduct);
router.delete('/product/:slug', protect, adminProtect, removeProduct);

// image upload cloud
router.post('/product/upload-images', protect, adminProtect, uploadImages);
router.post('/product/remove-images', protect, adminProtect, removeImages);

module.exports = router;
