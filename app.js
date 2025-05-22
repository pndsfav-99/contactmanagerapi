var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const contactsRouter = require('./routes/contacts');

const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(express.json());
app.use(require('cors')());
app.use('/contacts', contactsRouter);
app.use(cors({
  origin: '*', // temporairement autorise tout
  methods: ['GET', 'POST'],
  credentials: false
}));
module.exports = app;
