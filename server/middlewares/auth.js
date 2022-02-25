const admin = require('../firebase/index');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  // console.log(req.headers);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    // console.log('Firebase user in Protect', firebaseUser);

    req.user = firebaseUser;

    next();
  } catch (error) {
    res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
};

exports.adminProtect = async (req, res, next) => {
  const { email } = req.user;

  const admin = await User.findOne({ email }).exec();

  if (admin.role !== 'admin') {
    res.status(403).json({
      error: 'Resource not found! Access denied.',
    });
  } else {
    next();
  }
};
