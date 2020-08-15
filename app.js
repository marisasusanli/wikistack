const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout.js');
const wikiRouter = require('./routes/wiki.js');
const usersRouter = require('./routes/users.js');

const { db, Page, User } = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

app.get('/', (req, res, next) => res.redirect('/wiki'));

module.exports = app;
