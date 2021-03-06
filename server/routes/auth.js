const express = require('express');

const router = express.Router();

// Midleware
const { protect, adminProtect } = require('../middlewares/auth');

// Import
const { createOrUpdateUser, currentUser } = require('../controllers/auth');

router.post('/create-or-update-user', protect, createOrUpdateUser);
router.post('/current-user', protect, currentUser);
router.post('/current-admin', protect, adminProtect, currentUser);

module.exports = router;
