const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const slugify = require('slugify');

// load env variable
dotenv.config({ path: './config/config.env' });

// load models
const Product = require('./models/Product');

// Connect to Database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON files
const product = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/product.json`, 'utf-8')
);

// Imports into Database
const importData = async () => {
  try {
    await Product.create(product);

    console.log(
      'Data have been Imported. Please check your database.'.green.inverse.bold
    );

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Product.deleteMany();

    console.log(
      'WARNING!!! Data in Database have been Destroyed.'.red.inverse.bold
    );

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-import') {
  importData();
} else if (process.argv[2] === '-destroy') {
  deleteData();
}
