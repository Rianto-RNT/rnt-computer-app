const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// @desc    Get User Cart
// @route   GET /api/user/cart
// @access  Private
exports.getUserCart = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product')
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;

  res.status(200).json({ products, cartTotal, totalAfterDiscount });
});

// @desc    Create User Cart
// @route   POST /api/user/cart
// @access  Private
exports.userCart = asyncHandler(async (req, res, next) => {
  const { cart } = req.body;

  let products = [];

  // user existing login
  const user = await User.findOne({ email: req.user.email }).exec();

  // Check if cart with logged in user ID already exist
  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log('removed old cart');
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    // get price for createing total
    let userProductCheckout = await Product.findById(cart[i]._id).select('price').exec();

    object.price = userProductCheckout.price;

    products.push(object);
  }
  //   console.log('products', products);

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }
  //   console.log('cartTotal:', cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();

  if (!newCart) {
    return next(
      new ErrorResponse(`Resource not found with ${newCart}. (User Cart)`, 400)
    );
  }

  console.log('new cart ----> ', newCart);
  res.status(200).json({ ok: true });
});

// @desc    Empty User Cart in checkout
// @route   DELETE /api/user/cart
// @access  Private
exports.emptyCart = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  if (!cart) {
    return next(
      new ErrorResponse(
        `Resource not found with ${cart}. (Empty User Cart)`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: cart });
});

// @desc    Save Address in checkout
// @route   POST /api/user/address
// @access  Private
exports.saveAddress = asyncHandler(async (req, res, next) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  if (!userAddress) {
    return next(
      new ErrorResponse(
        `Resource not found with ${req.body.address}. (save address User checkout)`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: userAddress });
});
