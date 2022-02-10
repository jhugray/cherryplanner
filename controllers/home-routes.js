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
      const hours = ["0500", "0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100"]
      res.render('homepage', {
        calendarItems,
        hours,
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

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.redirect('/');
      });
    }
    else {
      res.status(404).end();
    }
});


module.exports = router;
