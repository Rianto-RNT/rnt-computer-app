const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const { readdirSync } = require('fs');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/error');

// Load env vars
dotenv.config({ path: './config/config.env' });

//app
const app = express();

// //Connect to Local DB
// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log(`MongoDB Local. Connected.`.cyan.underline.bold))
//   .catch((err) => console.log('MongoDB Local Connection error', err));

//Connect to cloud DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB Cloud. Connected.`.cyan.underline.bold))
  .catch((err) => console.log('MongoDB Cloud. Connection error', err));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());

// Routes Middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

app.use(errorHandler);

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
