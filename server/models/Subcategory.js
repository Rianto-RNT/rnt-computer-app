const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add name'],
    minlength: [2, 'name must be 2 minimum lenght'],
    mixlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subcategory', SubcategorySchema);
