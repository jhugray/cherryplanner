const router = require('express').Router();
const { CalendarItem } = require('../../models');

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
    ]
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
    startHour: req.body.startHour,
    user_id: req.session.user_id
  })
    .then(dbCalendarItemData => res.json(dbCalendarItemData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/calendar/:id', function (req, res, next) {
 CalendarItem.update(
   {body: req.body.body},
   {returning: true, where: {id: req.params.id} }
 )
 .then(function([ dbCalendarItemData, [updatedCalendarItem] ]) {
   res.json(updatedCalendarItem)
 })
 .catch(next)
})

module.exports = router;