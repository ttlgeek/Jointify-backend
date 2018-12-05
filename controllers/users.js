const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const randomstring = require('randomstring');

signToken = user => {
  return JWT.sign(
    {
      iss: 'Jointify',
      sub: user.id,
      iat: new Date().getTime(), // Current time
      exp: new Date().setDate(new Date().getDate() + 1) // Current time + 24 hours.
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, passwordConfirmation } = req.value.body;

    const foundUser = await User.findOne({
      email
    });

    if (foundUser) {
      return res.status(403).json({
        message: 'Email is already in use'
      });
    }

    const secretToken = randomstring.generate();
    let active = false;

    const newUser = new User({
      email,
      password,
      secretToken,
      active
    });

    await newUser.save();

    const token = signToken(newUser);

    res.status(200).json({
      token
    });
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);

    res.status(200).json({
      token,
      message: 'Signed in Successfully.'
    });
  },

  dashboard: async (req, res, next) => {
    res.json({
      ctaText: 'Book a Mentor'
    });
  },

  profile: async (req, res, next) => {
    const user = req.user;
    res.json({
      email: user.email,
      active: user.active
    });
  }
};
