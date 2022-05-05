const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Order = require('../models/Order');

// @desc    Get user order in admin dashboard
// @route   GET /admin/orders
// @access  Private / Admin
exports.orders = asyncHandler(async (req, res, next) => {
  let allOrders = await Order.find({})
    .sort('-createdAdt')
    .populate('products.product')
    .exec();

  res.json(allOrders);
});

// @desc    Update user order status in admin dashboard
// @route   PUT /admin/order-status
// @access  Private / Admin
exports.orderStatus = async (req, res, next) => {
  // console.log(req.body);
  // return;
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};
