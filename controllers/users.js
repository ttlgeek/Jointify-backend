const JWT = require('jsonwebtoken');
const randomstring = require('randomstring');

const User = require('../models/user');
const { JWT_SECRET } = require('../config');

const signToken = user => {
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
	signUp: async (req, res) => {
		try {
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

			const newUser = new User({
				email,
				password,
				secretToken
			});

			await newUser.save();

			const token = signToken(newUser);

			res.status(200).json({
				token
			});
		} catch (err) {
			res.status(400).json({ error: 'Something went wrong' });
		}
	},

	signIn: async (req, res) => {
		try {
			const token = signToken(req.user);

			res.status(200).json({
				token,
				message: 'Signed in Successfully.'
			});
		} catch (err) {
			res.status(400).json({
				error:
          'We dont recognize this e-mail or password. Double-check your information and try again.'
			});
		}
	},

	dashboard: async (req, res) => {
		res.json({
			ctaText: 'Book a Mentor'
		});
	},

	profile: async (req, res) => {
		const { email, active } = req.user;
		res.json({
			email,
			active
		});
	}
};
