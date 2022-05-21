const slugify = require('slugify');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const cloudUpload = require('../utils/cloudUpload');
const Product = require('../models/Product');
const User = require('../models/User');
const { aggregate } = require('../models/Product');

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
        `Failed! Product with ${req.params.slug} not found. Please select correct value.`,
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

// @desc    Related product in Product detail
// @route   Get /api/product/related/:productId
// @access  Public
exports.getRelatedProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .populate('category')
    .populate('subcategory')
    .populate('ratings')
    .limit(4)
    .exec();

  if (!related) {
    return next(
      new ErrorResponse(
        `Failed! Product with ${req.params.productId} not found. Please select correct value.`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: related });
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

// @desc    Advanced Searching and filtering
// @route   POST /api/serch/filters
// @access  Public
// <-- START OF SEARCH FILTER -->
// 1) Search by text
const handleQuery = asyncHandler(async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subcategory', '_id name')
    .populate('ratings', '_id name')
    .exec();

  res.status(200).json({ success: true, data: products });
});

// 2) Filtering by Price
const handlePrice = asyncHandler(async (req, res, price) => {
  let products = await Product.find({
    price: {
      $gte: price[0],
      $lte: price[1],
    },
  })
    .populate('category', '_id name')
    .populate('subcategory', '_id name')
    .populate('ratings', '_id name')
    .exec();

  if (!products) {
    return next(
      new ErrorResponse(
        `Product not found with ${price}. Please add correct value.`
      )
    );
  }

  res.status(200).json({ success: true, data: products });
});

// 3) Filtering by category
const handleCategory = asyncHandler(async (req, res, category) => {
  let products = await Product.find({ category })
    .populate('category', '_id name')
    .populate('subcategory', '_id name')
    .populate('ratings', '_id name')
    .exec();

  if (!products) {
    return next(
      new ErrorResponse(
        `Product not found with ${category}. Please add correct value.`
      )
    );
  }

  res.status(200).json({ success: true, data: products });
});

// 4) Filtering by stars
const handleStars = asyncHandler(async (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: '$$ROOT',
        floorAverage: {
          $floor: { $avg: '$ratings.star' },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(15)
    .exec((err, aggregates) => {
      if (err) console.log('Aggregate Error', err);
      Product.find({ _id: aggregates })
        .populate('category', '_id name')
        .populate('subcategory', '_id name')
        .populate('ratings', '_id name')
        .exec((err, products) => {
          if (err) console.log('Product Aggragate ERROR', err);

          res.status(200).json({ success: true, data: products });
        });
    });
});

// 5) Filtering by subcategory
const handleSubcategory = asyncHandler(async (req, res, sub) => {
  let products = await Product.find({ subcategory: sub })
    .populate('category', '_id name')
    .populate('subcategory', '_id name')
    .populate('ratings', '_id name')
    .exec();

  if (!products) {
    return next(
      new ErrorResponse(
        `Product not found with ${subcategory}. Please add correct value.`
      )
    );
  }

  res.status(200).json({ success: true, data: products });
});

// 6) Filtering by Shipping
const handleShipping = asyncHandler(async (req, res, shipping) => {
  let products = await Product.find({ shipping })
    .populate('category', '_id name')
    .populate('subcategory', '_id name')
    .populate('ratings', '_id name')
    .exec();

  if (!products) {
    return next(
      new ErrorResponse(
        `Product not found with ${shipping}. Please add correct value.`
      )
    );
  }

  res.status(200).json({ success: true, data: products });
});

// 7) Filtering by Color
const handleColor = asyncHandler(async (req, res, color) => {
  let products = await Product.find({ color })
    .populate('category', '_id name')
    .populate('subcategory', '_id name')
    .populate('ratings', '_id name')
    .exec();

  if (!products) {
    return next(
      new ErrorResponse(
        `Product not found with ${color}. Please add correct value.`
      )
    );
  }

  res.status(200).json({ success: true, data: products });
});

// 8) Filtering by brand
const handleBrand = asyncHandler(async (req, res, brand) => {
  let products = await Product.find({ brand })
    .populate('category', '_id name')
    .populate('subcategory', '_id name')
    .populate('ratings', '_id name')
    .exec();

  if (!products) {
    return next(
      new ErrorResponse(
        `Product not found with ${brand}. Please add correct value.`
      )
    );
  }

  res.status(200).json({ success: true, data: products });
});

exports.searchFilters = asyncHandler(async (req, res, next) => {
  const { query, price, category, stars, sub, shipping, color, brand } =
    req.body;

  if (query) {
    console.log('query ==>', query);
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    console.log('price range is ==>', price);
    await handlePrice(req, res, price);
  }

  if (category) {
    console.log('category on request ==> ', category);
    await handleCategory(req, res, category);
  }

  if (stars) {
    console.log('stars on request ==> ', stars);
    await handleStars(req, res, stars);
  }

  if (sub) {
    console.log('subcategory on request ==> ', sub);
    await handleSubcategory(req, res, sub);
  }

  if (shipping) {
    console.log('shipping on request ==> ', shipping);
    await handleShipping(req, res, shipping);
  }

  if (color) {
    console.log('color on request ==> ', color);
    await handleColor(req, res, color);
  }

  if (brand) {
    console.log('brand on request ==> ', brand);
    await handleBrand(req, res, brand);
  }
});
// <-- END OF SEARCH FILTER -->
