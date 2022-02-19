const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, CalendarItem, Accomplishment, Goal } = require('../models');


router.get('/', (req, res) => {
  // const date = 
  CalendarItem.findAll({
        //include where clause for current user and per date
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
      // date: date
    },
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
        attrubutes: ['id', 'username']
      }
    ]
  })
    .then(dbCalendarData => {
      const calendarItems = dbCalendarData.map(calendarItems => calendarItems.get({ plain: true }));

      //homeData object 
      //...  Start with a for loop going through the hours, setting up an array, and instead of being a string of hours, it will be objects with keys from the calender model (for fallback when no db data) (body (empty), startHour (from index of forloop), completionStatus(false))
      const homeData = [];
      const firstHour = 5;
      const lastHour = 21;
      for (let i = firstHour; i <= lastHour; i++ ) {
        homeData.push({
          startHour: i,
          body: '',
          completedStatus: false
        })
      }
      calendarItems.forEach(calendarItem => {
        homeData[calendarItem.startHour-firstHour] = calendarItem;
      });

      res.render('homepage', {
        // calendarItems: calendarItems,
        // hours:["0500", "0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100"],
        // loggedIn: req.session.loggedIn,
        homeData,
        activeUser: req.session.username,
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