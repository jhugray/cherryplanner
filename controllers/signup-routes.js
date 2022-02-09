const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, CalendarItem, Accomplishment, Goal } = require('../models');

router.get('/', (req, res) => {

  CalendarItem.findAll({
    attributes: [
      'id', 
      'body', 
      'completionStatus', 
      'date', 
      'startHour'
    ],
    include: [
      {
        model: User,
        attrubutes: ['id']
      }
    ]
  })
    .then(dbCalendarData => {
      const calendarItems = dbCalendarData.map(calendarItems => calendarItems.get({ plain: true }));
      
      res.render('homepage', {
        calendarItems,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
