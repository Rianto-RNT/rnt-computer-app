const slugify = require('slugify');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const cloudUpload = require('../utils/cloudUpload');
const Product = require('../models/Product');

// @desc    Get all product
// @route   GET /api/product
// @access  Private / Admin
exports.getAllProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});

  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

// @desc    List all product
// @route   GET /api/product/:count
// @access  Private / Admin
exports.listAllProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subcategory')
    .sort([['createdAt', 'desc']])
    .exec();

  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
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
        `Failed! Product with ${req.body.slug} already created. Please add another category.`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: product });
});

// @desc    Remove product
// @route   DELETE /api/product/:slug
// @access  Private / Admin
exports.removeProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOneAndDelete({
    slug: req.params.slug,
  }).exec();

  if (!product) {
    return next(
      new ErrorResponse(
        `Failed! Product with ${req.body.slug} not found. Please select correct value.`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc      Upload images for product
// @route     PUT /api/product/upload-images
// @access    Private
exports.uploadImages = asyncHandler(async (req, res, next) => {
  const imagesFile = await cloudUpload.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto', // jpg, png
  });

  // Check filesize
  if (imagesFile.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  res.status(200).json({
    success: true,
    public_id: imagesFile.public_id,
    url: imagesFile.secure_url,
  });
});

// @desc      Remove product images
// @route     DELETE /api/v1/product/:id/images
// @access    Private
exports.removeImages = asyncHandler(async (req, res, next) => {
  const image_id = req.body.public_id;

  const imagesFile = cloudUpload.uploader.destroy(image_id);

  // Check filesize
  if (!imagesFile) {
    return next(
      new ErrorResponse(
        `Images not found with id of ${req.params.image_id}. Please add correct id`,
        400
      )
    );
  }

  res.status(200).json({
    success: true,
    data: 'Image have been deleted',
  });
});
