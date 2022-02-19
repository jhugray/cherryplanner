const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, CalendarItem, Accomplishment, Goal } = require('../models');
const dayjs = require('dayjs');
// const { format, parse } = require('date-and-time');
//uninstall this 

router.get('/:date?', (req, res) => {
  

  let date = req.params.date;
  if (!date) {
    date = dayjs();
  }
 

  CalendarItem.findAll({
    where: {
      user_id: req.session.user_id,
      date
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
      const homeData = [];
      const firstHour = 5;
      const lastHour = 21;
      const activeDate = dayjs(date).format('dddd MMMM DD, YYYY');
      console.log(activeDate);
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
        homeData,
        activeDate,
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