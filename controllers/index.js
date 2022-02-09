const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
// const signupRoutes = require('./signup-routes.js');

// router.use('/signup', signupRoutes);
router.use('/', homeRoutes);
// router.use('/home', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;