const slugify = require('slugify');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const cloudUpload = require('../utils/cloudUpload');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get all product
// @route   GET /api/product
// @access  Private / Admin
exports.getAllProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

// @desc    Get Single product
// @route   GET /api/product/:slug
// @access  Private / Admin
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category')
    .populate('subcategory')
    .exec();

  res.status(200).json({ success: true, data: product });
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

// @desc    Update product
// @route   PUT /api/product/:slug
// @access  Private / Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).exec();

  if (!product) {
    return next(
      new ErrorResponse(
        `Failed! Product with ${req.body.slug} not found. Please select correct value.`,
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

// @desc    New Arival and Best Seller for product
// @route   POST /api/products
// @access  Public
exports.reuseableProduct = asyncHandler(async (req, res, next) => {
  const { sort, order, limit } = req.body;

  const products = await Product.find({})
    .populate('category')
    .populate('subcategory')
    .sort([[sort, order]])
    .limit(limit)
    .exec();

  if (!products) {
    return next(
      new ErrorResponse(
        `Failed! Product with ${req.body.slug} not found. Please select correct value.`,
        400
      )
    );
  }

  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

// @desc    Count product total for pagination
// @route   GET /api/products/total
// @access  Public
exports.productTotal = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).estimatedDocumentCount().exec();

  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
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
// @route     DELETE /api/product/:id/images
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

// @desc      Product ratings by currently user login
// @route     PUT /api/product/star-ratings/:productId
// @access    Private / User
exports.productRating = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).exec();

  const user = await User.findOne({ email: req.user.email }).exec();

  const { star } = req.body;

  // Make sure current user login already add ratings
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user not left ratings yet, then push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    console.log('ratingAdded', ratingAdded);

    res.status(200).json({ success: true, data: ratingAdded });
  } else {
    // if user have already left rating, then update it
    const ratingUpdated = Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      {
        $set: { 'ratings.$.star': star },
      },
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    console.log('ratingUpdated', ratingUpdated);

    res.status(200).json({ success: true, data: ratingUpdated });
  }
});
