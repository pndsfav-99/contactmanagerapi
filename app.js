var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactsRouter = require('./routes/contacts');

var app = express();


const cors = require('cors');

const corsOptions = {
  origin: 'https://nice-moss-0b8c0a900.6.azurestaticapps.net',
  methods: ['GET', 'POST'],
  credentials: false
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);


module.exports = app;
