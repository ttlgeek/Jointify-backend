import JWT from 'jsonwebtoken';
import randomstring from 'randomstring';

import User from '../models/user';
import { JWT_SECRET } from '../config';

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

export const signUp = async (req, res) => {
	try {
		// eslint-disable-next-line no-unused-vars
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
};

export const signIn = async (req, res) => {
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
};

export const dashboard = async (req, res) => {
	res.json({
		ctaText: 'Book a Mentor'
	});
};

export const profile = async (req, res) => {
	const { email, active } = req.user;
	res.json({
		email,
		active
	});
};
