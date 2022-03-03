const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Controller
const {
  getAllCategory,
  getSingleCategory,
  createCategory,
  updateCategory,
  removeCategory,
  getAllSubcategoryForProduct
} = require('../controllers/category');

// Routes
router.get('/category', getAllCategory);
router.get('/category/:slug', getSingleCategory);
router.post('/category', protect, adminProtect, createCategory);
router.put('/category/:slug', protect, adminProtect, updateCategory);
router.delete('/category/:slug', protect, adminProtect, removeCategory);

// this route is for create product to get all 
// subcategory with category ID in admin dashboard
router.get('/category/:id/subcategory',  protect, adminProtect, getAllSubcategoryForProduct)

module.exports = router;
