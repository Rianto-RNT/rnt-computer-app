const admin = require('../firebase/index');

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
