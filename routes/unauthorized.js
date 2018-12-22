const router = require("express-promise-router")();

router
  .route("/unauthorized")
  .get(async (req, res) => res.status(401).json({ message: "Unauthorized" }));

export default router;
