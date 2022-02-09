const seedUsers = require('./user-seeds');
const seedCalendars = require('./calendar-seeds');
const seedGoals = require('./goal-seeds');
const seedAccomplishments = require('./accomplishment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedCalendars();
  console.log('--------------');

  await seedGoals();
  console.log('--------------');

  await seedAccomplishments();
  console.log('--------------');

  process.exit(0);
};

seedAll();
