const router = require('express-promise-router')();

router
  .route('/unauthorized')
  .get(async (req, res) =>
    res.status(401).json({ message: 'Unauthorized :D Sorry' })
  );

router
  .route('/unauthorized')
  .post(async (req, res) =>
    res.status(401).json({ message: 'Unauthorized :D Sorry' })
  );

export default router;
