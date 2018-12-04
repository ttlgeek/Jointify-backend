const passport = require('passport');
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const passportAuth = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/profile').get(passportJWT, UsersController.profile);

router
  .route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router
  .route('/signin')
  .post(validateBody(schemas.authSchema), passportAuth, UsersController.signIn);

router.route('/dashboard').get(passportJWT, UsersController.dashboard);

module.exports = router;
