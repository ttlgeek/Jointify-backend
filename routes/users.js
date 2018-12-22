import passport from "passport";

import { profile, signUp, signIn, dashboard } from "../controllers/users";
import { validateBody, schemas } from "../helpers/routeHelpers";

const passportAuth = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

const router = require("express-promise-router")();

router.route("/signup").post(validateBody(schemas.authSchema), signUp);

router
  .route("/signin")
  .post(validateBody(schemas.authSchema), passportAuth, signIn);

router.route("/dashboard").get(passportJWT, dashboard);
router.route("/profile").get(passportJWT, profile);

export default router;
