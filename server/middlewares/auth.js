const admin = require('../firebase/index');

exports.protect = (req, res, next) => {
  console.log(req.headers);
  next();
};
