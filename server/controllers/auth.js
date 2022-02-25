const User = require('../models/User');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.match(/^([^@]*)@/)[1], picture },
    { new: true }
  );

  if (user) {
    console.log('User Updated', user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.match(/^([^@]*)@/)[1],
      picture,
    }).save();
    console.log('User Created', newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res, next) => {
  User.findOne({ email: req.user.email }).exec((error, user) => {
    if (error) throw new Error(error);
    res.json(user);
  });
};
