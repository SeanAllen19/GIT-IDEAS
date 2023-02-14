const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.PASSPHRASE,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`));
});





// const path = require('path');
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;

// const handlebars = require('express-handlebars');

// app.set('view engine', 'handlebars');

// app.engine('handlebars', handlebars({
//     layoutsDir: `${__dirname}/views/layouts`
// }));
// app.use(express.static('public'));



app.get('/', (req,res) => {
    res.render('homepage', {layout: 'main'})
})

// app.listen(PORT, () =>
// console.log(
//   `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
// )
// );


// // app.use(express.static(path.join(__dirname, 'public')));
// // app.engine('handlebars', hbs.engine);

// // const hbs = exphbs.create({ helpers });
// // const exphbs = require('express-handlebars');