const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const slugify = require('slugify');
const Subcategory = require('../models/Subcategory');

// @desc    Get All Subcategory
// @route   GET /api/subcategory
// @access  Public
exports.getAllSubcategory = asyncHandler(async (req, res, next) => {
  const categories = await Subcategory.find();

  res
    .status(200)
    .json({ success: true, count: categories.length, data: categories });
});

// @desc    Get Single Subcategory
// @route   GET /api/subcategory/:slug
// @access  Public
exports.getSingleSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = await Subcategory.findOne({ slug: req.params.slug });

  if (!subcategory) {
    return next(
      new ErrorResponse(
        `Subcategory not found with ${req.params.slug}. Please add corect value`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: subcategory });
});

// @desc    Create Subcategory
// @route   POST /api/subcategory
// @access  Private / Admin
exports.createSubcategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;

  const subcategory = await new Subcategory({
    name,
    category,
    slug: slugify(name),
  }).save();

  if (!subcategory) {
    return next(
      new ErrorResponse(
        `Failed! Subcategory with ${req.subcategory} already created. Please add another subcategory.`,
        400
      )
    );
  }
  
  res.status(201).json({ success: true, data: subcategory });
});

// @desc    Update Subcategory
// @route   PUT /api/subcategory/:slug
// @access  Private / Admin
exports.updateSubcategory = asyncHandler(async (req, res, next) => {
  let { name, category } = req.body;

  let subcategory = await Subcategory.findOneAndUpdate(
    { slug: req.params.slug },
    { name, category, slug: slugify(name) },
    { new: true, runValidators: true }
  );

  if (!subcategory) {
    return next(
      new ErrorResponse(
        `Subcategory not found with ${req.params.slug}. Please add corect value`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: subcategory });
});

// @desc    Delete Subcategory
// @route   DELETE /api/subcategory/:slug
// @access  Private / Admin
exports.removeSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = await Subcategory.findOneAndDelete({
    slug: req.params.slug,
  });

  if (!subcategory) {
    return next(
      new ErrorResponse(
        `Subcategory not found with ${req.params.slug}. Please add corect value`,
        400
      )
    );
  }

  subcategory.remove();

  res.status(200).json({ success: true, data: 'Subcategory has been remove' });
});
