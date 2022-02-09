const { CalendarItem } = require('../models')

const calendardata = [
  {
    body: 'this is my to do item',
    date: '2022-02-10',
    startHour: '07',
    user_id: '3'
  },
  {
    body: 'dentist apt',
    date: '2022-02-10',
    startHour: '14',
    user_id: '3'
  },
  {
    body: 'yoga',
    date: '2022-02-12',
    startHour: '13',
    user_id: '1'
  },
  {
    body: 'zoom call',
    date: '2022-02-10',
    startHour: '10',
    user_id: '1'
  },
  {
    body: 'lunch',
    date: '2022-02-10',
    startHour: '11',
    user_id: '2'
  },
];

const seedCalendars = () => CalendarItem.bulkCreate(calendardata, {individualHooks: true});

module.exports = seedCalendars;