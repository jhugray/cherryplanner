const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const calendarRoutes = require('./calendar-routes');
// const accomplishmentRoutes = require('./accomplishment-routes');
const goalRoutes = require('./goal-routes');

router.use('/users', userRoutes);
router.use('/calendar', calendarRoutes);
// router.use('/accomplishments', accomplishmentRoutes);
router.use('/goals', goalRoutes);

module.exports = router;