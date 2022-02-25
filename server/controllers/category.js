const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const slugify = require('slugify');
const Category = require('../models/Category');

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

  res.status(200).json({ success: true, data: displayCategory });
});

exports.getAllCategory = async (req, res, next) => {};
exports.getSingleCategory = async (req, res, next) => {};
exports.updateCategory = async (req, res, next) => {};
exports.removeCategory = async (req, res, next) => {};
