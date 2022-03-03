const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const slugify = require('slugify');
const Product = require('../models/Product');

// @desc    Get all product
// @route   POST /api/product
// @access  public
exports.getAllProduct = asyncHandler(async (req, res, next) => {
const products = await Product.find({})

  res.status(200).json({ success: true, count: products.length, data: products });
});

// @desc    Create product
// @route   POST /api/product
// @access  Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  
  const product = await new Product(req.body).save();

  if (!product) {
    return next(
      new ErrorResponse(
        `Failed! Category with ${req.body.slug} already created. Please add another category.`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: product });
});