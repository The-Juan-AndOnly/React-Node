// User Model
const User = require('../models/User');
// bcrypt for password hashing
const bcrypt = require('bcryptjs');

// Express Validator
const { check, validationResult } = require('express-validator');

// User Validation
exports.validate = method => {
  switch (method) {
    case 'addUser': {
      return [
        check('firstName', 'Please include First Name')
          .not()
          .isEmpty(),

        check('lastName', 'Please include Last Name')
          .not()
          .isEmpty(),

        check('emailAddress', 'Please enter a valid Email').isEmail(),
        check(
          'password',
          'Please enter a password with 7 or more characters'
        ).isLength({ min: 7 })
      ];
    }
  }
};

// Get Authorized User
exports.getUsers = (req, res, next) => {
  const user = req.currentUser;
  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress
  });
};

// Add a User
exports.addUser = async (req, res, next) => {
  const { firstName, lastName, emailAddress, password } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // See if user exists
    let user = await User.findOne({ where: { emailAddress: emailAddress } });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    //  Encrypt PassWord
    const salt = await bcrypt.genSalt(10);
    const saltedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      emailAddress,
      password: saltedPassword
    });

    res
      .status(201)
      .location('/')
      .end();
    // Return something
  } catch (err) {
    return next(err);
  }
};
