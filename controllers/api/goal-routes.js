const router = require('express').Router();
const { Goal } = require('../../models');

router.get('/', (req, res) => {
  Goal.findAll({
    where: {
      user_id: user,
      date
    },
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

router.put('/goal/:id', function(req, res, next) {
  Goal.update(
    {
      body: req.body.body,
      completionStatus: req.body.completionStatus
    },
    {
      returning: true, 
      where: {id: req.params.id}
    }
  )
  .then(function([dbGoalData, [updateGoalItem]]) {
    res.json(updatedGoal)
  })
  .catch(next)
});

module.exports = router;