const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const { readdirSync } = require('fs');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config.env' });

//app
const app = express();

//Connect DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB connected`.cyan.underline.bold))
  .catch((err) => console.log('MongoDB Connection error', err));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// Routes Middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

// PORT
const PORT = process.env.PORT || 8000;

// Server
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} node on port ${PORT}`.magenta
      .bold
  )
);

// Handle unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red);

  // Close server & exit process
  server.close(() => process.exit(1));
});
