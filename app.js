var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorsRouter = require('./routes/doctors');
var medicinesRouter = require('./routes/medicines');
var retailersRouter= require('./routes/retailers');
var wholesalersRouter= require('./routes/wholesalers');
var casesheetsRouter = require("./routes/casesheets");
var becomesRouter = require('./routes/becomes');
var prescriptionRouter = require('./routes/prescriptions');
var offerRouter = require('./routes/offers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/doctors',doctorsRouter);
app.use('/api/medicines',medicinesRouter);
app.use('/api/retailers', retailersRouter);
app.use('/api/wholesalers', wholesalersRouter);
app.use('/api/casesheets',casesheetsRouter);
app.use('/api/becomes',becomesRouter);
app.use('/api/prescriptions',prescriptionRouter);
app.use('/api/offer',offerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(bodyParser.urlencoded({
  extended: true
}));

module.exports = app;
