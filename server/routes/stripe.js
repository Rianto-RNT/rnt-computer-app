const express = require('express');
const router = express.Router();

const { createPaymentIntent } = require('../controllers/stripe');
const { route } = require("./user");

// middleware
const { protect } = require('../middlewares/auth');

router.post('/create-payment-intent', protect, createPaymentIntent);

module.exports = router;
