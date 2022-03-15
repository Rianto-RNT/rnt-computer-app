const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Controller
const {
  getAllProduct,
  getSingleProduct,
  listAllProduct,
  createProduct,
  updateProduct,
  removeProduct,
  uploadImages,
  removeImages,
  newArrival
} = require('../controllers/product');

// Main Routes
router.get('/product', getAllProduct);
router.get('/product/:slug', getSingleProduct);
router.get('/products/:count', listAllProduct);
router.post('/product', protect, adminProtect, createProduct);
router.put('/product/:slug', protect, adminProtect, updateProduct);
router.delete('/product/:slug', protect, adminProtect, removeProduct);

router.post('/products', protect, adminProtect, newArrival);

// image upload cloud
router.post('/product/upload-images', protect, adminProtect, uploadImages);
router.post('/product/remove-images', protect, adminProtect, removeImages);

module.exports = router;
