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
} = require('../controllers/category');

// Routes
router.get('/category', getAllCategory);
router.get('/category/:slug', getSingleCategory);
router.post('/category', protect, adminProtect, createCategory);
router.put('/category/:slug', protect, adminProtect, updateCategory);
router.delete('/category/:slug', protect, adminProtect, removeCategory);

module.exports = router;
