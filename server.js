const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const Handlebars = require('handlebars');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSSECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


Handlebars.registerHelper('lessThan', (a, b) => { return a < b });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});