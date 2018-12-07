import passport from 'passport';

import { profile, signUp, signIn, dashboard } from '../controllers/users';
import { validateBody, schemas } from '../helpers/routeHelpers';
import passportConf from '../passport'; // eslint-disable-line no-unused-vars

const router = require('express-promise-router')();

const passportAuth = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/profile').get(passportJWT, profile);

router.route('/signup').post(validateBody(schemas.authSchema), signUp);

router
	.route('/signin')
	.post(validateBody(schemas.authSchema), passportAuth, signIn);

router.route('/dashboard').get(passportJWT, dashboard);

export default router;
