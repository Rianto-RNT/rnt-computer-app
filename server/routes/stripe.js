const express = require('express');
const router = express.Router();

const { createPaymentIntent } = require('../controllers/stripe');

// middleware
const { protect } = require('../middlewares/auth');

router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
