const passport = require('passport');

const router = require('express-promise-router')();

const UsersController = require('../controllers/users');

const { validateBody, schemas } = require('../helpers/routeHelpers');

const passportConfig = require('../passport');

router
  .route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin').post(
  validateBody(schemas.authSchema),
  passport.authenticate('local', {
    session: false
  }),
  UsersController.signIn
);

router
  .route('/dashboard')
  .get(
    passport.authenticate('jwt', { session: false }),
    UsersController.dashboard
  );

module.exports = router;
