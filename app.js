const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout.js');
const wiki = require('./roots/wiki.js');
const users = require('./roots/users.js');

// const { db } = require('./models');
const { db, Page, User } = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wiki)
app.use('/users', users)

app.get('/', (req, res, send) => res.redirect('/wiki'));

db.authenticate().then(() => {
  console.log('connected to the database');
});

const PORT = 3000;

const init = async () => {
  await db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();

// app.listen(port, () => console.log('port is working'));
