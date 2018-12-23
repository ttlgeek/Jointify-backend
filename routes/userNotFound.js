const router = require("express-promise-router")();

router.route("/userNotFound").get(async (req, res) =>
  res.status(400).json({
    error:
      "We dont recognize this e-mail or password. Double-check your information and try again."
  })
);

export default router;
