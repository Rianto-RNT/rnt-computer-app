const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Controller
const {
  getAllSubcategory,
  getSingleSubcategory,
  createSubcategory,
  updateSubcategory,
  removeSubcategory,
} = require('../controllers/subcategory');

// Routes
router.get('/subcategory', getAllSubcategory);
router.get('/subcategory/:slug', getSingleSubcategory);
router.post('/subcategory', protect, adminProtect, createSubcategory);
router.put('/subcategory/:slug', protect, adminProtect, updateSubcategory);
router.delete('/subcategory/:slug', protect, adminProtect, removeSubcategory);

module.exports = router;
