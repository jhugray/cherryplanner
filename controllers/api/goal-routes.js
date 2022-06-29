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
  //return the goals
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
      //if no goal w/that ID, return an error
      if (!dbGoalData) {
        res.status(404).json({message: 'No goal found with this id'});
        return;
      }
      //return requested goal
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

router.put('/:id', function(req, res) {
  Goal.update(
    //what to update
    {body: req.body.body, completionStatus: req.body.completionStatus}, //what to update
    {where: {id: req.params.id}}
  )
    .then(dbGoalData => { 
      //if no goal w/that ID, return an error
      if (!dbGoalData) { 
        res.status(404).json({message: 'No goal found with this id'});
        return;
      }
      //return the updated goal
      res.json(dbGoalData); 
    })
    .catch(err => { 
      console.log(err);
      res.status(500).json(err);
    }
  );
});

module.exports = router;