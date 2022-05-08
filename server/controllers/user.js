const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

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
    let userProductCheckout = await Product.findById(cart[i]._id)
      .select('price')
      .exec();

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

  res.status(200).json({ ok: true });
});

// @desc    Apply Coupon To User Cart
// @route   POST /api/user/cart/coupon
// @access  Private
exports.applyCouponToUserCart = asyncHandler(async (req, res, next) => {
  const { coupon } = req.body;

  console.log('Coupon===>> ', coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: 'Invalid Coupon! Please try to add other coupons.',
    });
  }
  console.log('valid coupon ====>> ', validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { product, cartTotal } = await Cart.findOne({
    orderedBy: user._id,
  })
    .populate('products.product', '_id title price')
    .exec();

  console.log(
    'cartTotal ===>>',
    cartTotal,
    'discount ===>>',
    validCoupon.discount
  );

  // calculate the Price total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(0); // 99.99

  console.log('total After Discount ===>>>', totalAfterDiscount);

  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
});

// @desc    Create User Order
// @route   POST /api/user/order
// @access  Private
exports.createOrder = async (req, res, next) => {
  // console.log(req.body);
  // return;

  const { paymentIntent } = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  // decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT itme.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log('PRODUCT QUANTITY-- AND SOLD++ ====>>>', updated);

  console.log('NEW ORDER SAVED ====>>>', newOrder);
  res.json({ ok: true });
};

// @desc    Get All User Order
// @route   GET /api/user/orders
// @access  Private / User
exports.orders = async (req, res, next) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderedBy: user._id })
    .populate('products.product')
    .exec();

  res.json(userOrders);
};

// @desc    Get User Wishlist
// @route   GET /my-account/wishlist
// @access  Private / User
exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};

// @desc    Add to wishlist
// @route   POST /my-account/wishlist
// @access  Private / User
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

// @desc    Edit / Remove user wishlist
// @route   PUT /my-account/wishlist/:productId
// @access  Private / User
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};
