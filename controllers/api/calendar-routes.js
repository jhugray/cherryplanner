const router = require('express').Router();
const { User, CalendarItem, Accomplishment, Goal } = require('../../models');

// get all calendar items
router.get('/', (req, res) => {
  CalendarItem.findAll({
    attributes: [
      'id',
      'body',
      'completionStatus',
      'date',
      'startHour'
    ],
    // include: [
    //   {
    //     model: User,
    //     attributes: ['username']
    //   }
    // ]
  })
    .then(dbCalendarItemData => res.json(dbCalendarItemData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  CalendarItem.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'body',
      'completionStatus',
      'date',
      'startHour'
    ],
    // include: [
    //   {
    //     model: User,
    //     attributes: ['username']
    //   }
    // ]
  })
    .then(dbCalendarItemData => {
      if (!dbCalendarItemData) {
        res.status(404).json({ message: 'No todo found with this id' });
        return;
      }
      res.json(dbCalendarItemData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  CalendarItem.create({
    body: req.body.body,
    date: req.body.date,
    startHour: req.body.startHour
  })
    .then(dbCalendarItemData => res.json(dbCalendarItemData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // pass in req.body instead to only update what's passed through
  CalendarItem.update(
    {
      body: req.body.body,
      completionStatus: req.body.completionStatus
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCalendarItemData => {
      if (!dbCalendarItemData) {
        res.status(404).json({ message: 'No todo found with this id' });
        return;
      }
      res.json(dbCalendarItemData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;