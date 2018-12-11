import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import User from './models/user';
import { JWT_SECRET } from './config';

const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

// JWT Strategy
const options = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: JWT_SECRET
};

passport.use(
	new JWTStrategy(options, async (payload, done) => {
		try {
			const user = await User.findById(payload.sub);
			if (!user) {
				return done(null, false, {
					message:
            'No User has been found with the credentials you have entered'
				});
			}

			done(null, user);
		} catch (error) {
			done(error, false, {
				message: 'Something went wrong, it is probably our fault'
			});
			console.log(error.message);
		}
	})
);

// Locl Strategy
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email'
		},
		async (email, password, done) => {
			try {
				const user = await User.findOne({
					email
				});

				if (!user) {
					return done(null, false, {
						message: 'No user found with the credentials you have entered'
					});
				}

				const isMatch = await user.isValidPassword(password);

				if (!isMatch) {
					return done(null, false, {
						message: 'Email or password Incorrect'
					});
				}

				done(null, user);
			} catch (error) {
				done(error, false, {
					message: "Sorry, Something went wrong, it's probably our fault"
				});
			}
		}
	)
);
