const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const slugify = require('slugify');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

// @desc    Get All Category
// @route   GET /api/category
// @access  Public
exports.getAllCategory = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  res
    .status(200)
    .json({ success: true, count: categories.length, data: categories });
});

// @desc    Get Single Category
// @route   GET /api/category/:slug
// @access  Public
exports.getSingleCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });

  if (!category) {
    return next(
      new ErrorResponse(
        `Category not found with ${req.params.slug}. Please add corect value`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: category });
});

// @desc    Create Category
// @route   POST /api/category
// @access  Private / Admin
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const category = await new Category({ name, slug: slugify(name) }).save();

  if (!category) {
    return next(
      new ErrorResponse(
        `Failed! Category with ${req.category} already created. Please add another category.`,
        400
      )
    );
  }

  const displayCategory = await Category.findOne(req.body);

  res.status(201).json({ success: true, data: displayCategory });
});

// @desc    Update Category
// @route   PUT /api/category/:slug
// @access  Private / Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let { name } = req.body;

  let category = await Category.findOneAndUpdate(
    { slug: req.params.slug },
    { name, slug: slugify(name) },
    { new: true, runValidators: true }
  );

  if (!category) {
    return next(
      new ErrorResponse(
        `Category not found with ${req.params.slug}. Please add corect value`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: category });
});

// @desc    Delete Category
// @route   DELETE /api/category/:slug
// @access  Private / Admin
exports.removeCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findOneAndDelete({ slug: req.params.slug });

  if (!category) {
    return next(
      new ErrorResponse(
        `Category not found with ${req.params.slug}. Please add corect value`,
        400
      )
    );
  }

  category.remove();

  res.status(200).json({ success: true, data: 'Category has been remove' });
});

// @desc    Get all subcategory for product with category ID
// @route   GET /api/category/:id/subcategory
// @access  Private / Admin
exports.getAllSubcategoryForProduct = asyncHandler(async (req, res, next) => {
  const subcategory = await Subcategory.find({ category: req.params.id });

  if (!subcategory) {
    return next(
      new ErrorResponse(
        `Category not found with ${req.params.id}. Please add corect value`,
        400
      )
    );
  }

  res
    .status(200)
    .json({ success: true, count: subcategory.length, data: subcategory });
});
