const { Accomplishment} = require('../models')

const accomplishmentdata = [
  {
    body: 'I did 10min meditation',
    date: '2022-02-10',
    user_id: '3'
  },
  {
    body: 'I helped a coworker troubleshoot a tough problem.',
    date: '2022-02-10',
    user_id: '3'
  },
  {
    body: 'I fixed the bug!',
    date: '2022-02-12',
    user_id: '1'
  },
  {
    body: 'I made a nice dinner for my family.',
    date: '2022-02-10',
    user_id: '1'
  },
  {
    body: 'Did a load of laundry AND put it away.',
    date: '2022-02-10',
    user_id: '2'
  },
];

const seedAccomplishments = () => Accomplishment.bulkCreate(accomplishmentdata, {individualHooks: true});

module.exports = seedAccomplishments;