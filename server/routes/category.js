const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Controller
const {
  createCategory,
  getSingleCategory,
  updateCategory,
  removeCategory,
  getAllCategory,
} = require('../controllers/category');

// Routes
router.post('/category', protect, adminProtect, createCategory);
router.get('/category', getAllCategory);
router.get('/category/:slug', getSingleCategory);
router.put('/category/:slug', protect, adminProtect, updateCategory);
router.delete('/category/:slug', protect, adminProtect, removeCategory);

module.exports = router;
