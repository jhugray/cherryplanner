const router = require('express').Router();
const { User, CalendarItem, Accomplishment, Goal } = require('../models');
const dayjs = require('dayjs');

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

router.get('/goals', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  Goal.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'body',
      'date',
      'completionStatus'
    ]
  })
    .then(dbGoalData => {
      res.render('goals', {
        goals: dbGoalData
      });
    }
    )
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:date?', (req, res) => {
  let date = req.params.date;
  //default to today's date
  if (!date) {
    date = dayjs();
  };

  //have "or null" so that if there is no user logged in, page loads. otherwise user_id is undefined and page does not load
  //only empty homedata objects will be loaded as there are no calendaritems w/null user
  let user = req.session.user_id || null;

  CalendarItem.findAll({
    where: {
      user_id: user,
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
        attributes: ['id', 'username']
      }
    ]
  })
    .then(dbCalendarData => {
      const calendarItems = dbCalendarData.map(calendarItems => calendarItems.get({ plain: true }));
      const homeData = [];
      const firstHour = 5;
      const lastHour = 21;
      //format to match data model
      const saveDate = dayjs(date).format('YYYY-MM-DD');
      //format to display on homepage
      const activeDate = dayjs(date).format('dddd MMMM DD, YYYY');
      const nextDate = dayjs(date).add(1, 'day').format('YYYY-MM-DD');
      const previousDate = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');
      console.log(activeDate);
      //generate empty objects for every startHour that include a body, completedStatus and saveDate
      //push to homeData array
      for (let i = firstHour; i <= lastHour; i++ ) {
        homeData.push({
          startHour: i,
          body: '',
          completedStatus: false,
          date: saveDate
        })
      }
      calendarItems.forEach(calendarItem => {
        //homeData[index] = calendarItem
        homeData[calendarItem.startHour-firstHour] = calendarItem;
      });

      res.render('homepage', {
        //data to be used on the front end 
        homeData,
        activeDate,
        nextDate,
        previousDate,
        activeUser: req.session.username,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
    
});

module.exports = router;