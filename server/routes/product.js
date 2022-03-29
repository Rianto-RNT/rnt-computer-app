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
  reuseableProduct,
  productTotal,
  productRating,
  getRelatedProduct,
  searchFilters
} = require('../controllers/product');

// Count product total for paggination routes
router.get('/products/total', productTotal);

// Main Routes
router.get('/product', getAllProduct);
router.get('/product/:slug', getSingleProduct);
router.get('/products/:count', listAllProduct);
router.post('/product', protect, adminProtect, createProduct);
router.put('/product/:slug', protect, adminProtect, updateProduct);
router.delete('/product/:slug', protect, adminProtect, removeProduct);

// Show product with other card in homepage (ex: New Arrival, etc)
router.post('/products', reuseableProduct);

// image upload cloud
router.post('/product/upload-images', protect, adminProtect, uploadImages);
router.post('/product/remove-images', protect, adminProtect, removeImages);

// Ratings routes
router.put('/product/star-ratings/:productId', protect,  productRating);

// related product routes
router.get('/product/related/:productId', getRelatedProduct);

// Search and filtering feature routes
router.post('/search/filters', searchFilters)


module.exports = router;
