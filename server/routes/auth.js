const express = require('express');

const router = express.Router();

// Midleware
const { protect } = require('../middlewares/auth');

// Import
const { createOrUpdateUser } = require('../controllers/auth');

router.post('/create-or-update-user', protect, createOrUpdateUser);

module.exports = router;
