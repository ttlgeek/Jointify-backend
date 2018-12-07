import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from './config';
import User from './models/user';

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
				return done(null, false);
			}

			done(null, user);
		} catch (error) {
			done(error, false);
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
					return done(null, false);
				}

				const isMatch = await user.isValidPassword(password);

				if (!isMatch) {
					return done(null, false);
				}

				done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);
