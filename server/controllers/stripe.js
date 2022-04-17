const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const Cart = require('../models/Cart');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// @desc    Create Payment Intent Stripe
// @route   POST /api/create-payment-intent
// @access  Private
exports.createPaymentIntent = async (req, res) => {
  // later apply coupon
  // later calculate price

  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec();
  // 2 get user cart total
  const { cartTotal } = await Cart.findOne({ orderedBy: user._id }).exec();

  console.log("CART TOTAL CHARGED ===>>", cartTotal);
  // create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartTotal * 100,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
