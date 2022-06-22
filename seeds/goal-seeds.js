const { Goal } = require('../models')

const goaldata = [
  {
    body: 'plan meals for the week',
    date: '2022-02-10',
    user_id: '3'
  },
  {
    body: 'watch youtube video on graphQL',
    date: '2022-06-23',
    user_id: '3'
  },
  {
    body: 'Start Ruby Monk',
    date: '2022-02-12',
    user_id: '1'
  },
  {
    body: 'organize the laundryroom cupboard',
    date: '2022-02-10',
    completionStatus: '1',
    user_id: '1'
  }
];

const seedGoals = () => Goal.bulkCreate(goaldata, {individualHooks: true});

module.exports = seedGoals;