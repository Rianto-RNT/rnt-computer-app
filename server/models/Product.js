const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Add a title'],
    unique: true,
    trim: true,
    maxlength: [150, 'Title cannot be more than 150 character length'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a product description'],
    maxlength: [2000, 'Description Cannot be more than 2000 character length'],
  },
  price: {
    type: Number,
    required: [true, 'Product must have a price.'],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  subcategory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Subcategory',
    },
  ],
  quantity: Number,
  sold: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
  },
  shipping: {
    type: String,
    enum: ['Yes', 'No'],
  },
  color: {
    type: String,
    enum: ["Yellow","Green", "Red", "Black", "Silver", "Blue", "White", "Grey", "Space Grey", "Mate Black", "Mate Grey"],
  },
  brand: {
    type: String,
    enum: ["Apple", "Lenovo", "HP", "Acer", "Microsoft", "Asus", "MSi", "Alienware", "Razer", "Huawei", "Dell", "Axioo", "Avita"],
  },
  //   ratings: [
  //     {
  //       star: Number,
  //       postedBy: {
  //         type: mongoose.Schema.ObjectId,
  //         ref: 'User',
  //       },
  //     },
  //   ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
