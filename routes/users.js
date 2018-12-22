import passport from 'passport';

import { profile, signUp, signIn, dashboard } from '../controllers/users';
import { validateBody, schemas } from '../helpers/routeHelpers';
import { passportJWT, passportAuth } from '../config';

const router = require('express-promise-router')();

router.route('/signup').post(validateBody(schemas.authSchema), signUp);

router
  .route('/signin')
  .post(validateBody(schemas.authSchema), passportAuth, signIn);

router.route('/dashboard').get(passportJWT, dashboard);
router.route('/profile').get(passportJWT, profile);

export default router;
