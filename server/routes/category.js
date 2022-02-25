const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Controller
const { create, read, update, remove, list } = require('../controllers/category');

// Routes
router.post('/category', protect, adminProtect, create)
router.get('/categories', list)
router.get('/category/:slug', protect, adminProtect, read)
router.put('/category/:slug', protect, adminProtect, update)
router.delete('/category:/slug', protect, adminProtect, remove)

module.exports = router;
