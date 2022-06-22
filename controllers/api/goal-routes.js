const router = require('express').Router();
const { Goal } = require('../../models');

router.get('/', (req, res) => {
  Goal.findAll({
    attributes: [
      'id',
      'body',
      'date',
      'completionStatus'
    ]
  })
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Goal.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'body',
      'date',
      'completionStatus'
    ]
  })
    .then(dbGoalData => {
      if (!dbGoalData) {
        res.status(404).json({message: 'No goal found with this id'});
        return;
      }
      res.json(dbGoalData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Goal.create({
    body: req.body.body,
    date: req.body.date,
    user_id: req.session.user_id,
    completionStatus: req.body.completionStatus
  })
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//fix put route
router.put('/goals/:id', function(req, res, next) {
  Goal.update(
    {
      body: req.body.body
    },
    {
      returning: true, 
      where: {id: req.params.id}
    }
  )
  .then(function([dbGoalData, [updatedGoal]]) {
    res.json(updatedGoal)
  })
  .catch(next)
});

module.exports = router;