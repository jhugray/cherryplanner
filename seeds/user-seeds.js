const { User } = require('../models');

const userdata = [
  {
    username: 'jess120',
    email: 'j120@email.com',
    password: 'password120'
  },
  {
    username: 'uniqueusername',
    email: 'unique@email.com',
    password: 'password1'
  },
  {
    username: 'unicorn',
    email: 'unicorn@email.ca',
    password: 'password2'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;