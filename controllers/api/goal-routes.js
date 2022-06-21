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